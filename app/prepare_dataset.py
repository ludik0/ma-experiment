from .util import *

def prepare_compass_dataset(filename, path_data, columns = ['age', 'age_cat', 'sex', 'race',  'priors_count', 'days_b_screening_arrest', 'c_jail_in', 'c_jail_out',
               'c_charge_degree', 'is_recid', 'is_violent_recid', 'two_year_recid', 'decile_score', 'score_text', 'id'], user_data={},user_index=0):

    # Read Dataset
    lengthOfStayIncluded = False
    if 'length_of_stay' in columns:
        lengthOfStayIncluded = True
        columns.remove('length_of_stay')
    df = pd.read_csv(path_data + filename, delimiter=',', skipinitialspace=True)
    if len(user_data)>0 and user_index!=0:
        print("Before")
        #[  24    3    1    0   10    0    0    1    1    1 8821]
        #[  24    3    1    0   10    0    0    1    1    1 8821]
        print(df[df['id'] == user_index])
        for key, value in user_data.items():
            
            index = df[df['id'] == user_index].index[0]
            df.set_value(index, key, value)
        print("After")
        print(df[df['id'] == user_index])

    df = df[columns]

  
    if lengthOfStayIncluded:
        df['c_jail_out'] = pd.to_datetime(df['c_jail_out'])
        df['c_jail_in'] = pd.to_datetime(df['c_jail_in'])
        df['length_of_stay'] = (df['c_jail_out'] - df['c_jail_in']).dt.days
        df['length_of_stay'] = np.abs(df['length_of_stay'])

        df['length_of_stay'].fillna(df['length_of_stay'].value_counts().index[0], inplace=True)
        df['length_of_stay'] = df['length_of_stay'].astype(int)
    if "days_b_screening_arrest" in columns:  
        df['days_b_screening_arrest'] = np.abs(df['days_b_screening_arrest'])
        df['days_b_screening_arrest'].fillna(df['days_b_screening_arrest'].value_counts().index[0], inplace=True)
        df['days_b_screening_arrest'] = df['days_b_screening_arrest'].astype(int)

    def get_class(x):
        if x < 5:
            return 'Low'
        if x < 7:
            return 'Medium'
        else:
            return 'High'
    df['class'] = df['decile_score'].apply(get_class)

    del df['c_jail_in']
    del df['c_jail_out']
    del df['decile_score']
    del df['score_text']

    columns = df.columns.tolist()
    columns = columns[-1:] + columns[:-1]
    df = df[columns]
    class_name = 'class'
    possible_outcomes = list(df[class_name].unique())

    type_features, features_type = recognize_features_type(df, class_name)
    discrete = []
    for discrete_feature in ['is_recid', 'is_violent_recid', 'two_year_recid']:
        if discrete_feature in columns:
            discrete.append(discrete_feature)
    discrete, continuous = set_discrete_continuous(columns, type_features, class_name, discrete=discrete,
                                                   continuous=None)

    columns_tmp = list(columns)
    columns_tmp.remove(class_name)
    idx_features = {i: col for i, col in enumerate(columns_tmp)}

    # Dataset Preparation for Scikit Alorithms
    df_le, label_encoder = label_encode(df, discrete)
    X = df_le.loc[:, df_le.columns != class_name].values
    y = df_le[class_name].values

    dataset = {
        'name': filename.replace('.csv', ''),
        'df': df,
        'columns': list(columns),
        'class_name': class_name,
        'possible_outcomes': possible_outcomes,
        'type_features': type_features,
        'features_type': features_type,
        'discrete': discrete,
        'continuous': continuous,
        'idx_features': idx_features,
        'label_encoder': label_encoder,
        'X': X,
        'y': y,
    }

    return dataset
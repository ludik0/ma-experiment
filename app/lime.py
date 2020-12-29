import lime.lime_tabular
import sklearn
import numpy as np
import re
import uuid
from subprocess import call
import os
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
def get_lime_vis():
    iris = sklearn.datasets.load_iris()
    train, test, labels_train, labels_test = sklearn.model_selection.train_test_split(iris.data, iris.target, train_size=0.80)

    rf = sklearn.ensemble.RandomForestClassifier(n_estimators=50)
    rf.fit(train, labels_train)

    explainer = lime.lime_tabular.LimeTabularExplainer(train, feature_names=iris.feature_names, class_names=iris.target_names, discretize_continuous=True)

    i = np.random.randint(0, test.shape[0])
    exp = explainer.explain_instance(test[i], rf.predict_proba, num_features=4, top_labels=1)
    print(exp, exp.local_exp)
    used_features_idx = list()
    used_features_importance = list()
    logic_explanation = list()
    for idx, weight in exp.local_exp[list(exp.local_exp.keys())[0]]:
        used_features_idx.append(idx)
        used_features_importance.append(weight)
        logic_explanation.append(exp.domain_mapper.discretized_feature_names[idx])
    response = {}
    for feature, weight in zip(logic_explanation, used_features_importance):
        print(feature, weight)
        response[feature] = weight

    print ("--------------------------------------------------------------------")
    return response
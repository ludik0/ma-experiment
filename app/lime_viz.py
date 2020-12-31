import lime
import lime.lime_tabular
import sklearn
import sklearn.datasets
import sklearn.ensemble
import numpy as np
import re
import uuid
from subprocess import call
import os
from pathlib import Path
import time
from sklearn.ensemble import RandomForestClassifier
import profile

class LimeViz:
    
    def __init__(self):
        self.targetIndex = 0
        iris = sklearn.datasets.load_iris()
        self.featurenames = iris.feature_names
        self.train, self.test, self.labels_train, self.labels_test = sklearn.model_selection.train_test_split(iris.data, iris.target, train_size=0.80,shuffle=False)
        self.rf = sklearn.ensemble.RandomForestClassifier(n_estimators=50)
        self.explainer = lime.lime_tabular.LimeTabularExplainer(self.train, feature_names=iris.feature_names, class_names=iris.target_names, discretize_continuous=True)
        self.rf.fit(self.train, self.labels_train)
    def get_lime_vis(self,data):
       
        if( data == None):
            data = self.test[self.targetIndex]
        else:
            data = np.fromiter(data, dtype=float)
        print("as array",data)
        #i = np.random.randint(0, test.shape[0])
        
        #profile.run('explainer.explain_instance(test[i], rf.predict_proba, num_features=4, top_labels=1)')
        start = time.time()
        exp = self.explainer.explain_instance(data, self.rf.predict_proba, num_features=4, top_labels=1,num_samples=1000)
        end = time.time()
        print("Explain instance:",end - start)
        
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
        return response

    def getSampleValues(self):
        print(self.test[self.targetIndex])
        response = {}
        for i in range(0,len(self.featurenames)):
            response[self.featurenames[i]] = self.test[self.targetIndex][i]
        return response
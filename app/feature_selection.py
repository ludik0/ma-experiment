import lime
import lime.lime_tabular
import sklearn
import sklearn.datasets
import sklearn.ensemble
from .prepare_dataset import *

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np
import re
import uuid
from subprocess import call
import os
from pathlib import Path
import time
from sklearn.ensemble import RandomForestClassifier
import profile

class FeatureSelection:
   
    def __init__(self):
        self.testRecordIndex = 19
        start = time.time()
        dataset_name = 'compas-scores-two-years.csv'
        path_data = './app/datasets/'
        self.dataset = prepare_compass_dataset(dataset_name, path_data)
        X, y = self.dataset['X'], self.dataset['y']
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(X, y, test_size=0.2, random_state=0,shuffle=False)
        blackbox = RandomForestClassifier(n_estimators=20)
        blackbox.fit(self.X_train, self.y_train)

        end = time.time()
        print("TOOK: "+str(end - start))
    def calculateNewResult(self,columnslist):
        dataset_name = 'compas-scores-two-years.csv'
        path_data = './app/datasets/'
        print(columnslist)
        newColumns = columnslist + ['decile_score', 'score_text','c_jail_in', 'c_jail_out', 'id']
        print(newColumns)
        dataset = prepare_compass_dataset(dataset_name, path_data, columns=newColumns)
        X, y = dataset['X'], dataset['y']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0,shuffle=False)
        print(X_train)
        print(dataset["df"].head(self.testRecordIndex))
        blackbox = RandomForestClassifier(n_estimators=20)
        blackbox.fit(X_train, y_train)
        print(str(X_test[self.testRecordIndex]))
        result = blackbox.predict([X_test[self.testRecordIndex]])[0]
        print(dataset["possible_outcomes"])
        print("Result:" + str(result))
        return {"result":dataset["possible_outcomes"][result]}
    def getFeatureList(self):
        return self.dataset["idx_features"]
from sklearn.datasets import load_iris
import re
import uuid
from subprocess import call
import os
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier

from sklearn.tree import export_graphviz
def show_rule_vis():
    
    Path("./tmp").mkdir(parents=True, exist_ok=True)

    iris = load_iris()

    # Model (can also use single decision tree)
    model = RandomForestClassifier(n_estimators=10)

    # Train
    model.fit(iris.data, iris.target)
    # Extract single tree
    estimator = model.estimators_[5]
    id = str(uuid.uuid4())
    # Export as dot file
    tree_vis = export_graphviz(estimator, 
                    feature_names = iris.feature_names,
                    class_names = iris.target_names,
                    rounded = True, proportion = False, 
                    precision = 2, filled = True,impurity=False)

    f = tree_vis
    f = re.sub('(\\\\nsamples = [0-9]+)(\\\\nvalue = \[[0-9]+, [0-9]+, [0-9]+\])', '', f)
    f = re.sub('(samples = [0-9]+)(\\\\nvalue = \[[0-9]+, [0-9]+, [0-9]+\])\\\\n', '', f)
    f = re.sub('(\\\\nclass = [a-z]+)', '', f)
    with open('./tmp/'+id+'.dot', 'w') as file:
        file.write(f)
    
    call(['dot', '-Tpng', './tmp/'+id+'.dot', '-o', './tmp/'+id+'.png', '-Gdpi=600'])

    return './tmp/'+id+'.png'
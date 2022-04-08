---
title: "마켓과 머신러닝(Chapter_5_2)"
author: "winters"
date: '2022-03-30'
---

# 교차 검증과 그리드 서치
- 키워드 : 하이퍼 파라미터 ( 그리드서치 vs 램덤서치)
- 데이터가 작을 떄 주로 사용
- 하이퍼 파라미터
  + max_depth : 3, 정확도가 84%
- 결론
  + 모르면 디폴드만 쓰자!
  + 가성비 (시간 대비 성능 보장 안됨!)

# 검증 세트
- 테스트 세트 (1회성)
- 훈련 데이터를 훈련 데이터 + 검증 데이터로 재 분할

## 현실
- 테스트 데이터가 별도로 존재하지 않음!
- 전체 데이터 = 훈련 (6) : 검증 (2) : 테스트 (2)
  + 테스트 데이터는 모르는 데이터로 생각!


```python
import pandas as pd
wine = pd.read_csv("https://bit.ly/wine_csv_data")

data = wine[['alcohol', 'sugar', 'pH']].to_numpy()
target = wine['class'].to_numpy()
```


```python
from sklearn.model_selection import train_test_split

train_input, test_input, train_target, test_target = train_test_split(
    data, target, test_size = 0.2, random_state = 42
)
```


```python
sub_input, val_input, sub_target, val_target = train_test_split(
    train_input, train_target, test_size = 0.2, random_state = 42
)
```


```python
print(sub_input.shape, val_input.shape)
```

    (4157, 3) (1040, 3)
    

# 모델 만든 후 평가


```python
from sklearn.tree import DecisionTreeClassifier
dt = DecisionTreeClassifier(random_state = 42)
dt.fit(sub_input, sub_target)
print(dt.score(sub_input, sub_target))
print(dt.score(val_input, val_target))
```

    0.9971133028626413
    0.864423076923077
    

# 교차 검증
- : 훈련 세트에서 무작위로 검증 세트를 각각 다르게 떼어 내어 평가하는 과정을 여러 번 반복
- 교차 검증의 목적 : 좋은 모델이 만들어진다!
  + 좋은 모델 != 성능 좋은 모델
  + 좋은 모델 = 과대적합이 아닌 모델 = 모형의 오차가 적은 모델 = 안정적인 모델
- 교재 245p
  + 모델평가 1 : 90% (소요시간 : 1시간)
  + 모델평가 2 : 85%
  + 모델평가 3 : 80%
- 단점 : 시간이 오래 걸림

# 교차 검증 함수



```python
from sklearn.model_selection import cross_validate # cross_validate 교차 검증 함수
scores = cross_validate(dt, train_input, train_target)
print(scores)
```

    {'fit_time': array([0.02901554, 0.01234174, 0.01105666, 0.01976061, 0.01070189]), 'score_time': array([0.00157857, 0.00140238, 0.00126791, 0.00145054, 0.00131822]), 'test_score': array([0.86923077, 0.84615385, 0.87680462, 0.84889317, 0.83541867])}
    

- 최종점수 평균 구하기


```python
import numpy as np
print(np.mean(scores['test_score'])) # test_score = 위에서 검증한 폴드의 점수 **혼동주의**
```

    0.855300214703487
    

- 훈련 세트 섞은 후, 10-폴드 교차검증


```python
from sklearn.model_selection import StratifiedKFold
splitter = StratifiedKFold(n_splits = 10, shuffle = True, random_state = 42) # n_splits 몇 폴드 교차 검증을 할지
scores = cross_validate(dt, train_input, train_target, cv = splitter) # cv = splitter 최적의 분할과 최적의 랜덤 분할을 선택하는 랜덤분할

print(np.mean(scores['test_score']))
```

    0.8574181117533719
    

# 하이퍼파라미터 튜닝
- 하이퍼파라미터란 : 모델이 학습할 수 없어서 사용자가 지정해야만 하는 파라미터
- 사이킷런과 같은 머신러닝 라이브러리를 사용할 때 이런 하이퍼파라미터는 모두 class나 method의 매개변수로 표현
- 랜덤 서치 사용
- 자동으로 잡아주는 라이브러리들이 등장하기 시작함
  + hyperopt



```python
- GridSearchCV class는 하이퍼파라미터 탐색과 교차 검증을 한 번에 수행
```


      File "<ipython-input-10-258156bef445>", line 1
        - GridSearchCV class는 하이퍼파라미터 탐색과 교차 검증을 한 번에 수행
                            ^
    SyntaxError: invalid syntax
    



```python
%%time

from sklearn.model_selection import GridSearchCV
params = {
    'min_impurity_decrease' : [0.0001, 0.0002, 0.0003, 0.0004, 0.0005],
    'max_depth' : [3, 4, 5, 6, 7]
}
# dt = DecisionTreeClassifier(random_state = 42)
gs = GridSearchCV(DecisionTreeClassifier(random_state = 42), params, n_jobs = -1)
gs.fit(train_input, train_target)
dt = gs.best_estimator_ # best_estimator는 훈련이 끝나면 25개의 모델중에서 검증 점수가 가장 높은 모델의 매개변수 조합으로 전체 훈련 세트에서 자동으로 다시 모델을 훈련
print(dt)
print(dt.score(train_input, train_target))
print(gs.best_params_) # best_params 그리드 서치로 찾은 최적의 매개변수
```

    DecisionTreeClassifier(max_depth=7, min_impurity_decrease=0.0005,
                           random_state=42)
    0.8830094285164518
    {'max_depth': 7, 'min_impurity_decrease': 0.0005}
    CPU times: user 308 ms, sys: 63.9 ms, total: 372 ms
    Wall time: 4.09 s
    


```python
print(gs.cv_results_['mean_test_score']) # 각 매개변수에서 수행한 교차 검증의 평균 점수
```

    [0.84125583 0.84125583 0.84125583 0.84125583 0.84125583 0.85337806
     0.85337806 0.85337806 0.85337806 0.85318557 0.85780355 0.85799604
     0.85857352 0.85857352 0.85838102 0.85645721 0.85799678 0.85876675
     0.85972866 0.86088306 0.85607093 0.85761031 0.85799511 0.85991893
     0.86280466]
    

# 랜덤 서치
- p.252. 매개변수 값의 목록을 전달하는 것이 아니라 매개변수를 샘플링 할 수 있도록 확률 분포 객체를 전달.


```python
from scipy.stats import uniform, randint
rgen = randint(0, 10)
rgen.rvs(10) # rvs 무작위로 표본을 만듬
```




    array([8, 5, 3, 1, 5, 9, 3, 1, 7, 8])




```python
np.unique(rgen.rvs(1000), return_counts = True) # return_counts = True 는 중복되지 않는 요소들이 입력 배열에 나타난 회 수를 리턴
```




    (array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
     array([ 95, 103, 106, 100,  91, 102, 104,  92,  97, 110]))




```python
from sklearn.model_selection import RandomizedSearchCV
# p.254
params = {
    'min_impurity_decrease' : uniform(0.0001, 0.001),
    'max_depth' : randint(20,50)
}


gs = RandomizedSearchCV(DecisionTreeClassifier(random_state = 42), params,
                        n_iter = 100, n_jobs = -1, random_state = 42)
gs.fit(train_input, train_target)
```




    RandomizedSearchCV(estimator=DecisionTreeClassifier(random_state=42),
                       n_iter=100, n_jobs=-1,
                       param_distributions={'max_depth': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7fb54e9ea550>,
                                            'min_impurity_decrease': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7fb54e104390>},
                       random_state=42)




```python
gs.best_params_ # 최적의 매개변수 조합 출력
```




    {'max_depth': 29, 'min_impurity_decrease': 0.000437615171403628}



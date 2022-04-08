---
title: "마켓과 머신러닝(Chapter_5_3)"
author: "winters"
date: '2022-03-30'
---

# 트리의 앙상블
- LightGBM 기억!
  + GBM --> XGBoost --> LightBGM
  + 참고 1. 모델 개발 속도가 빨라졌는지?
  + 참고 2. 모델의 성능이 좋아졌는지?
- TabNet (2019)
  + 딥러닝 컨셉 이해

## 랜덤 포레스트(Forest)
- 결정 트리 나무를 500개 심기
- 최종적인 결정은 투표 방식
  + 나무-1 : 양성
  + 나무-2 : 음성
  + 나무-3 : 양성
  ...
  + 나무-500 : 양성


```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

wine = pd.read_csv('https://bit.ly/wine_csv_data')

data = wine[['alcohol', 'sugar', 'pH']].to_numpy()
target = wine['class'].to_numpy()

train_input, test_input, train_target, test_target = train_test_split(data, 
                                                                      target, 
                                                                      test_size=0.2, 
                                                                      random_state=42)
```

- p.267
  + cross_validate() 교차 검증 수행


```python
from sklearn.model_selection import cross_validate
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_jobs = -1, random_state = 42) # 모든 CPU 코어를 사용
scores = cross_validate(rf, train_input, train_target,
                        return_train_score = True, n_jobs = -1)
print(np.mean(scores['train_score']), np.mean(scores['test_score']))
```

    0.9973541965122431 0.8905151032797809
    


```python
rf.fit(train_input, train_target)
print(rf.feature_importances_)
```

    [0.23167441 0.50039841 0.26792718]
    


```python
rf = RandomForestClassifier(oob_score = True, n_jobs = -1, random_state = 42) # oob(out of bag) 부트스트랩 샘플에 포함되지 않고 남는 샘플
rf.fit(train_input, train_target)
print(rf.oob_score_)
```

    0.8934000384837406
    

# 그레이디언트 부스팅
- 이전 트리(깊이가 얕은 결정 트리)의 오차를 보완하는 방식으로 사용
- 학습률 매개변수로 속도를 조절
- 장점 : 과대적합을 잘 억제시킴
- 단점 : 속도가 느림


```python
from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier(random_state = 42)
scores = cross_validate(gb, train_input, train_target,
                        return_train_score = True, n_jobs = -1) # return_train_score 훈련 점수 포함 여부

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
```

    0.8881086892152563 0.8720430147331015
    


```python
gb = GradientBoostingClassifier(n_estimators = 500, learning_rate = 0.2, random_state = 42)
scores = cross_validate(gb, train_input, train_target,
                        return_train_score = True, n_jobs = -1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
```

    0.9464595437171814 0.8780082549788999
    

- 흐름
  + 0. 데이터 전처리 / 시각화
  + 1. 기본 모형으로 전체 흐름을 설계
  + 2. 여러 모형을 비교 대조
  + 3. 교차검증. 하이퍼파라미터 성능 비교
  + ...

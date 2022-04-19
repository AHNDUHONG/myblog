---
title: "Github_blog (hexo) error fatal: The current branch main has no upstream branch."
author: "winters"
date: '2022-04-19'
categories: 'Error'
tags: 'Git'
---



- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.

---

# 개요

- git push를 하는 과정에서 발생한 error fatal: The current branch main has no upstream branch. 를 해결하는 과정을 설명

### error fatal: The current branch main has no upstream branch.

- git push를 하는 과정에서 다음과 같이 오류가 생김
    
    ![png](images/Github_Fatal_01/1.png)
    
    - 이 에러는 원격 저장소 이름을 언급하지 않아서 생긴다.
- <u><span style="color:red">`git remote -v`</span></u> 로 원격 저장소 이름을 찾은 뒤 원격 저장소를 <u><span style="color:red">`git push origin main`</span></u> 로 명시해주면 된다.
    - 필자의 경우 원격 저장소가 origin 이며 branch는 main이므로 저렇게 입력했다.
    - <u><span style="color:red">`! [rejected] main -> main (non-fast-forward)`</span></u> 에러가 나와 <u><span style="color:red">`git push origin +main`</span></u> 처럼 branch에 +만 입력했더니 정상적으로 되었다.
        - 참고 사이트 : [https://somjang.tistory.com/entry/Git-rejected-master-master-non-fast-forward-해결-방법](https://somjang.tistory.com/entry/Git-rejected-master-master-non-fast-forward-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
        
        ![png](images/Github_Fatal_01/2.png)
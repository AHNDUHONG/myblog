---
title: "Github_blog(hexo) 연동 오류 -tokken"
author: "winters"
date: '2022-04-12'
categories: 'github'
tags: 'tokken'
---


- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.

---

### 개요

- 깃허브 블로그 계정 연동 오류 fatal: Authentication failed for ~ 를 github tokken 을 생성함으로 해결 하는 방법입니다.

---

- 깃허브(Github) 블로그 테마를 변경하면서 무엇을 잘못 건들였는지 git add, commit, push 도 가능하고 블로그에 글도 업데이트 되는데 깃허브 메인 화면의 **30 contributions in the last year 및 내 활동기록이 기록이 되지않는다.**
    - git add, commit, push 정상 작동
    
    ![png](images/Github_blog(hexo)_tokken/1.png)
    
    - Github 메인화면 내 활동 기록이 기록되지 않는 현상 발견

    ![png](images/Github_blog(hexo)_tokken/2.png)

- 처음에는 커밋(commit)이라는 단어를 내가 잘못 이해하고 있나 라고 의심을 해서 커밋에 대한 구글링을 했지만 내가 알고 있는 커밋이라는 용어가 틀리지 않았고 어떻게 해야될지 감이 안잡혀 evan 강사님([https://dschloe.github.io/](https://dschloe.github.io/))에게 여쭤보았고 방법을 알려주셨다.
    - windows 검색 화면에서 웹 자격 증명을 클릭
    
    ![png](images/Github_blog(hexo)_tokken/3.png)
    
    - windows 자격 증명
    
    ![png](images/Github_blog(hexo)_tokken/4.png)
    
    - 일반 자격 증명에서 github 목록을 클릭하여 편집을 눌러 계정을 다시 업데이트 한다

    ![png](images/Github_blog(hexo)_tokken/5.png)

- 그 후에 Pycharm(필자는 Pycharm을 통해 프로젝트를 관리 하는중)에 돌아와 다시 git add, commit, push 를 하면 fatal: Authentication failed for ~ 라는 문구가 뜬다. 이 문구는 local 계정과 github 계정의 연동이 틀려서 나오는 것이고 ID/Password 는 21년 8월 이후로 토큰으로 대체 되었다 라는 의미입니다. 즉 계정 연동을 다시 해줘야 한다는 뜻이므로 토큰을 생성 및 연동하러 Github 페이지로 접속하겠습니다.

    ![png](images/Github_blog(hexo)_tokken/6.png)

## Tokken

- [https://wotres.tistory.com/m/entry/Github-에러-해결법-Authentication-failed-for-use-a-personal-access-token-instead](https://wotres.tistory.com/m/entry/Github-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EB%B2%95-Authentication-failed-for-use-a-personal-access-token-instead) 고수트님의 블로그 내용을 참고하여 계정 연동을 시작
    - 깃허브 접속
        - [https://github.com/](https://github.com/)
    
    - 우측 상단의 settings 클릭
    
    ![png](images/Github_blog(hexo)_tokken/7.png)
    
    - 좌측 메뉴 끝에 developer settings 클릭
    
    ![png](images/Github_blog(hexo)_tokken/8.png)
    
    - Personal access tokens 클릭
    
    ![png](images/Github_blog(hexo)_tokken/9.png)
    
    - Note, expiration에 작성하고 싶은 내용, 기간 설정 후 repo 클릭 후 Generate tokken 클릭
    
    ![png](images/Github_blog(hexo)_tokken/10.png)
    
    - 생성된 토큰 코드 복사
    
    ![png](images/Github_blog(hexo)_tokken/11.png)
    
    - git push
        - git push를 입력하면 ID / Password 입력하라고 하는데 사용자의 깃허브 아이디와 복사한 토큰을 패스워드에 넣어주면 된다.(패스워드는 입력을 해도 보이지 않게 되어 필자는 ctrl+v로 붙여 넣었다. ***terminal 창에서 ctrl+v 로 붙여넣기가 되지않으면 insert 키로 붙여넣으면 됨.)
        
        ![png](images/Github_blog(hexo)_tokken/12.png)
        
        - git push 를 할 때 마다 위의 사진 처럼 Username 과 Password(tokken)을 입력하라고 나오기 때문에 Tokken 은 복사하여 메모장이나 기록할 파일에 저장하길 바랍니다.
---
title: "Github_blog(hexo) 연동 오류 -global"
author: "winters"
date: '2022-04-12'
categories: 'github'
tags: 'global'
---


- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.

---

### 개요

- 깃허브 블로그 계정 연동 오류 fatal: Authentication failed for ~ 를 github tokken 이 아닌 —global로 해결하는 방법을 나타냄 **(21년 8월 이후 변경된 토큰으로 인해 토큰을 이용 하지 않으면 불가능한 방법입니다, 아래 링크 글로 이동한 뒤 참고하여 해결하세요.)**
    - Github_blog (hexo) 연동 오류 -tokken : [https://ahnduhong.github.io/2022/04/12/Github_blog(hexo)_tokken/](https://ahnduhong.github.io/2022/04/12/Github_blog(hexo)_tokken/)

---

- 깃허브(Github) 블로그 테마를 변경하면서 무엇을 잘못 건들였는지 git add, commit, push 도 가능하고 블로그에 글도 업데이트 되는데 깃허브 메인 화면의 **30 contributions in the last year 및 내 활동기록이 기록이 되지않는다.**
    - **git add, commit, push 정상 작동**
        
        ![png](images/Github_blog(hexo)_global/1.png)
        
    
    ---
    
    - **Github 메인화면 내 활동 기록이 기록되지 않는 현상 발견**
        
        ![png](images/Github_blog(hexo)_global/2.png)
        
    
    ---
    
- 처음에는 커밋(commit)이라는 단어를 내가 잘못 이해하고 있나 라고 의심을 해서 커밋에 대한 구글링을 했지만 내가 알고 있는 커밋이라는 용어가 틀리지 않았고 어떻게 해야될지 감이 안잡혀 evan 강사님([https://dschloe.github.io/](https://dschloe.github.io/))에게 여쭤보았고 방법을 알려주셨다.
    - **windows 검색 화면에서 웹 자격 증명을 클릭**
        
        ![png](images/Github_blog(hexo)_global/3.png)
        
    
    ---
    
    - **windows 자격 증명**
        
        ![png](images/Github_blog(hexo)_global/4.png)
        
    
    ---
    
    - **일반 자격 증명에서 github 목록을 클릭하여 편집을 눌러 계정을 다시 업데이트 한다**
        
        ![png](images/Github_blog(hexo)_global/5.png)
        
    
    ---
    
    - **그 후에 Pycharm(필자는 Pycharm을 통해 프로젝트를 관리 하는중)에 돌아와 다시 git add, commit, push 를 하면 fatal: Authentication failed for ~ 라는 문구가 뜬다. 이 문구는 local 계정과 github 계정의 연동이 틀려서 나오는 것이고 ID/Password 는 21년 8월 이후로 토큰으로 대체 되었다 라는 의미입니다. 즉 계정 연동을 다시 해줘야 한다는 뜻이므로 이번엔 tokken이 아닌 git config —global 방식으로 해결하겠습니다.**
    

## git config —global

- [https://imitursa.tistory.com/3213](https://imitursa.tistory.com/3213) 이 블로그를 참고하며 해결 방법을 작성 하겠습니다.
    - **관리자 권한으로 명령창을 연다**.
        
        ![png](images/Github_blog(hexo)_global/6.png)
        
    
    ---
    
    - **‘git config —system —unset credential.helper’ 명령어를 입력한다.(오타 주의)**
        
        ![png](images/Github_blog(hexo)_global/7.png)
        
    
    ---
    
    - **‘git config —global —unset credential.helper’  명령어를 입력한다.**
        
        ![png](images/Github_blog(hexo)_global/8.png)
        
    
    ---
    
    - **다시 작업 했던 Project(필자는 Pycharm을 사용)로 돌아와 git add, commit, push 를 해주면 계정을 입력하라는 내용이 나온다.**
        
        ![png](images/Github_blog(hexo)_global/9.png)
        
    
    ---
    
    - **21년 8월 이후로 토큰 방식으로 연동 방법이 변경되어 토큰을 갖고 로그인을 하라고 나옵니다.**
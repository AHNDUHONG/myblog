---
title: "Github_blog(hexo) 연동 오류 (Contribution 업데이트 오류)"
author: "winters"
date: '2022-04-12'
categories: 'github'
tags: 'contribution'
---


- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.

---

### 개요

- 지난 Github_blog (hexo) 연동 오류 -global, -tokken 이 두개의 글을 쓰며 드디어 된줄 알았던 깃허브 블로그 Contribution 연동 오류가 기록이 되지 않아 계정 및 설정을 확인 함으로 해결하는 방법을 나타냄.
    - 참고 블로그: [https://develaniper-devpage.tistory.com/76](https://develaniper-devpage.tistory.com/76)
    - Github_blog (hexo) 연동 오류 -tokken : [https://ahnduhong.github.io/2022/04/12/Github_blog(hexo)_tokken/](https://ahnduhong.github.io/2022/04/12/Github_blog(hexo)_tokken/)
    - Github_blog (hexo) 연동 오류 -global 글은 Github 계정 비밀번호를 Tokken으로 대체 하였기에 현 시점 으로선 불가능한 해결 방법이기 때문에 출처를 남기지 않겠습니다.

---

### Contribution 그래프가 채워지는 조건

1. 커밋할 때 사용한 이메일 주소가 ghithub계정의 이메일 주소와 같아야 한다.
2. fork를 한 commit은 적용되지 않고 독립적인 repository에서 이루어진 commit이여야 한다.
3. 커밋은 다음으로 만들어 져야한다.(필자의 경우 main을 branch로 한다)
    1. repository의 default branch(보통 master)
    2. gh-pages branch(github page branch)

---

1. git command 사용으로 등록된 이메일 주소 확인

- 확인 해 보니 계정이 달라서 변경함.
    
    ```bash
    -> git config user.email
    -> git config --global user.email mymail@site.com
    ```
    
    ![png](images/Github_blog(hexo)_contribution/1.png)
    

---

- 드디어 연동이 가능합니다..

![png](images/Github_blog(hexo)_contribution/2.png)

- 혹시나 Git Command로 확인 해도 안되셨다면 위 참고 블로그에서 소스트리(source tree)로 변경해보시길 바랍니다.
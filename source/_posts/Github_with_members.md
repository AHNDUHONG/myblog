---
title: '[Git hub] 다른사람과 프로젝트 관리하는 법'
author: 'winters'
date: '2022-05-12'
categories: 'Github'
tags: 'Github'
---



- 이 글은 [https://velog.io/@debut12/Github-여러-명과-프로젝트-공유하기](https://velog.io/@debut12/Github-%EC%97%AC%EB%9F%AC-%EB%AA%85%EA%B3%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0) 블로그를 참고하여 작성 된 글입니다.

---

# 개요

- Git hub의 새로운 Repository를 만들어 팀원들과 함께 관리를 할 수 있게 권한을 주는 과정을 설명한다.

# Repositoy 생성

- Git hub 홈페이지 repository를 생성해준다.
    - 아래 체크 박스에 있는 항목들은 필요에 따라서 선택적으로 체크하면 된다.
    
    ![png](images/Github_with_members/1.png)
    

---

# 폴더에 Git 연동하기

- 아래 사진의 네모 상자의 코드를 입력하면 연동이 완료된다.( 기존 git hub 새로운 repository연동과 같다)
    
    ![png](images/Github_with_members/2.png)
    
    ```bash
    echo "# Kakaotalk_chatbot_finance_" >> README.md       # READ.ME 파일에 " " 부분이 입력이 된다.
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/AHNDUHONG/Kakaotalk_chatbot_finance_.git
    git push -u origin main            # git push <remote> <branch>로 한번 저장하여 베포한 뒤 git push만으로 베포 가능
    
    # 이 코드는 필자가 만든 Repository에 맞게 생성된 코드들이기 때문에 각자 Repository에 맞게
    # 수정하길 바란다.
    ```
    
    ---
    

- 필자는 repository에 이미 만들어진 폴더가 있기 때문에 git push를 입력 했을때 오류가 발생했다.
    
    ![png](images/Github_with_members/3.png)
    
    ![png](images/Github_with_members/4.png)
    

---

### Git 연동 과정 중 오류 발생 및 해결

- 위의 오류는 내 컴퓨터 저장소의 폴더에 없는 파일이 이미 내 Github Repository에 기록 되어있기때문에 생기는 것 이므로 <u><span style="color:red">`git pull`</span></u>로 파일을 가져오기로 한다.
    - <u><span style="color:red">`git remote -v`</span></u> 로 원격 저장소 이름을 확인 한다.
    
    ![png](images/Github_with_members/5.png)
    
    ---
    
    - 위 사진으로 확인한 origin 저장소를 main branch로 pull을 하기 위해 <u><span style="color:red">`git pull origin main`</span></u> 작성
        
        ![png](images/Github_with_members/6.png)
        
        ---
        
    - <u><span style="color:red">`fatal: refusing to merge unrelated histories`</span></u> 오류가 발생하여 <u><span style="color:red">`git pull origin 브런치명 --allow-unrelated-histories`</span></u> 을 사용하여 오류 해결
        - <u><span style="color:red">`--allow-unrelated-histories`</span></u> 이 명령 옵션은 이미 존재하는 두 프로젝트의 기록(history)을 저장하는 드문 상황에 사용된다고 한다. 즉, git에서는 서로 관련 기록이 없는 이질적인 두 프로젝트를 병합할 때 기본적으로 거부하는데, 이것을 허용해 주는 것이다.
            - 참고 URL: [https://gdtbgl93.tistory.com/63](https://gdtbgl93.tistory.com/63)
        
        ![png](images/Github_with_members/7.png)
        
        ---
        
    
- 아래와 같이 bash 폴더가 생성되면 성공적으로 파일을 Git에 연동한 것이다.
    
    ![png](images/Github_with_members/8.png)
    
    ---
    

# Git Contributors 추가하기 (다른 사람에게 Repository 수정 및 생성 권한 주기)

- Github 홈페이지로 돌아와서 각자가 만든 Repository에 접속하여 Settings > Collaborators > Manage access 경로로 들어가 Add people로 권한을 줄 사람을 추가한다.
    
    ![png](images/Github_with_members/9.png)
    
    ---
    
- Github **USERNAME, FULL NAME, Email** 으로 추가가 가능하다.
    
    ![png](images/Github_with_members/10.png)
    
    ---
    
- 추가한 사람의 허용을 받으면 Pending Invite 가 사라진다.
    
    ![png](images/Github_with_members/11.png)
    
    ---
    

# Branch 만들기

- Branch 확인을 한다
    - 필자가 현재 사용하고 있는 branch는 master다.
    - 아래 사진은 모든 branch를 *로 나타내고 그 중 현재 사용중인 branch를 <u><span style="color:green">**초록색**</span></u>으로 보여준다.
    
    ![png](images/Github_with_members/12.png)
    
    ---
    

- Branch 만들기
    
    ```bash
    git branch (`원하는 branch명`)
    ```
    

- Branch 확인
    
    ```bash
    git branch
    ```
    

- 필자는 팀원의 개개인의 이니셜로 Branch를 생성했다.
    
    ![png](images/Github_with_members/13.png)
    
    ---
    

- 개개인의 Branch로 접속하는 코드는 아래와 같다
    
    ```bash
    git checkout <Branch명>
    ```
    

# Branch 상태에서 push, pull 하기

- **Push**
    - 임의로 README에 데이터 추가 후 <u><span style="color:red">`add, commit, push`</span></u> 하기
        
        > 이때 add, commit은 동일한 방식을 사용하고 push는 맨 처음 할 때는 아래와 같은 코드를 사용 해주어야 그 뒤부터는 간단하게 push로 사용이 가능하다.
        > 
        > 
        > ```bash
        > git push --set-upstream origin <branch명>
        > ```
        > 
    
    - branch를 만든 후 첫 push를 할 경우
        
        > 코드 수정
        > 
        > 
        > ```bash
        > # 1. add
        > 			git add .
        > # 2. commit
        > 			git commit -m "commit할 내용"
        > # 3. push
        > 			git push --set-upstream origin <Branch명>
        > 
        > ```
        > 
    - 아래 사진과 같이 생성한 Branch로 push되었음을 확인할 수 있다.
        
        ![png](images/Github_with_members/14.png)
        

### 참고

- git branch를 활용하여 팀 프로젝트를 진행하려면 모든 팀원이 git의 개념에 대해 정확히 알고 있어야 하므로 숙련자가 아닌 사용자가 사용하기엔 적합하지 않습니다(오류가 발생했을 시 해결하는 과정 rollback 등 복잡한 과정이 생겨 프로젝트에 대한 시간을 소모하는 것이 아닌 git에 대한 시간을 소모하는 시간이 주가 될수 있다.) 혹시나 git 개념에 대해 자세히 알고 싶으신 분은 아래의 링크를 참고하여 아래 링크부터 순차적으로 작성된 글을 보시는 것을 권합니다.
    - ****[Git이란? 무엇을 저장할까?](https://readystory.tistory.com/145)****
        - [https://readystory.tistory.com/145?category=786243](https://readystory.tistory.com/145?category=786243)
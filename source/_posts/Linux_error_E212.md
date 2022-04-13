---
title: "리눅스 파일 저장 에러 해결 [E212: Can't open file for writing]"
author: "winters"
date: '2022-04-13'
categories: 'Linux'
tags: 'Error'
---


- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.

---

### 개요

- Ubuntu 프로그램 WSL2 Linux 환경에서 발생한 에러인 E212: Can't open file for writing 를 해결하기 위한 과정을 작성한 것 입니다.(필자는 경로 설정을 잘못하여 에러가 발생한 것이지만 경로 설정이 맞는 일반적인 상황에서의 해결도 작성되어 있습니다.)

---

- 22/4/13 강사님의 블로그를 통해 WSL2 설정을 마친 후 Linux 환경에 대한 명령어에 익숙해지기 위해 [temp.sh](http://temp.sh) 파일을 생성하여 적응하는 도중 작성한 기록을 저장하는 도중 E212: Can't open file for writing 에러가 발생하였다. 이 에러는 권한 문제로 나온 것 같다.
    - WSL2 설치 및 그 외 설정 사이트 : [https://dschloe.github.io/settings/windows_docker_install/](https://dschloe.github.io/settings/windows_docker_install/)
    
    ![png](images/Linux_error_E212/1.png)
    

---

- 이럴때는  **sudo vi 만드려는 파일명 으로 하던지** 파일 생성후  저장 할때 **:w !sudo tee % > /dev/null** 로 해결 가능하다고 한다.
    - 참고 사이트:  [https://iamrealizer.tistory.com/47](https://iamrealizer.tistory.com/47)
    
    ```bash
    :w !sudo tee % > /dev/null
    ```
    
    ![png](images/Linux_error_E212/2.png)
    

---

- 하지만 필자는 저장 및 파일을 닫기도 불가능하다. (:q! 로 나갈수는 있었으나 저장이 불가능, root 계정을 확인했는데.. 왜 불가능할까)

- 확인해보니 경로가 잘못되어 있었다.. (혹시나 boot 같은 다른 파일을 잘못 건들면 삭제하고 다시 설치 하며 환경 설정을 재 설정 해야되는 불상사가 일어날 수 있으니 조심)
    
    ![png](images/Linux_error_E212/3.png)
    

---

- cd .. 으로 기본 값으로 돌아와서 cd root 로 경로 설정을 한 뒤에 sudo vi [temp.sh](http://temp.sh) 로 temp.sh 파일을 생성(파일이 이미 있으면 편집으로 돌아옴)
    
    ![png](images/Linux_error_E212/4.png)
    
    ```bash
    cd.. # 이전 경로로 이동
    ls # 내가 위치한 경로의 파일 확인
    cd root # root 파일로 경로 이동
    sudo vi file.text # 파일 생성 및 편집 **필자는 {temp.sh} 파일을 생성 하여 편집함
    ```
    
    - 여기서 root 는 관리자 라는 의미로 파일을 수정 및 삭제 등 이 가능, 필자가 들은 바로는 회사에 들어가서 하나의 프로젝트를 맡아서 작업을 한다면 root 가 아닌 다른 계정을 받아 권한을 얻어야 된다고 함.

---

- [temp.sh](http://temp.sh) 파일 생성 및 저장 후 종료가 가능해졌습니다. (:wq 는 리눅스 환경에서 저장하고 나가기)
    
    ![png](images/Linux_error_E212/5.png)
    
    - 리눅스 환경 vi 명령어는 [https://blockdmask.tistory.com/25](https://blockdmask.tistory.com/25) 이 링크에 들어가셔서 확인 하시길 바랍니다.
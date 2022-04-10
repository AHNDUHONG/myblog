---
title: "깃허브(헥소) 블로그 환경설정 변경(미완성)"
author: "winters"
date: '2022-04-10'
---

# Github_blog (hexo)

- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.
    
    ---
    
- 평소 Github 블로그에 대해 그 날 들은 강의들만 올리다가 강사님의 따끔하신 일침으로 제대로 된 관리를 해보자 라는 생각이 들어 실행에 옮겨보았다. Github 블로그에 글을 올리는 것은 가능했으나 글을 분류하기 위한 카테고리, 태그 등 깔끔하게 블로그 관리를 못하는 상황이라 블로그를 새롭게 개편해보기로 마음 먹었다.

### 테마

- 처음 눈에 뜨인 것은 "블로그 테마" 어떻게 하면 블로그를 조금 더 깔끔하게 보일수 있으면 어떨까란 생각에 다른 사용자의 글을 보며 결국 테마를 "[tranquilpeak](https://github.com/kakawait/hugo-tranquilpeak-theme)" 으로 변경하기로 했다.
    
    [GitHub - kakawait/hugo-tranquilpeak-theme: A gorgeous responsive theme for Hugo blog framework](https://github.com/kakawait/hugo-tranquilpeak-theme)
    

- 위 링크를 참고하며 tranquilpeak 테마를 변경하는 중 수많은 에러들이 발생하였고 해결하며 테마 변경을 하였다. (해결 당시 글을 쓰고 있지 않아 뒤죽박죽 섞여서 과정 설명은 참고 사이트로 대체 합니다.)
    - Remote origin already exists : 기존에 연결되어 있는 레파지토리가 다시 새로운 레파지토리에 소스코드를 올리려고 하면 발생되는 에러.
        - 참고 사이트 [https://coding-factory.tistory.com/619](https://coding-factory.tistory.com/619)
    - Fatal : refusing to merge unrelated histories :  이 오류는 명령어 git push 또는 git pull을 진행할때 발견할 수 있는 오류, 로컬 저장소와 원격지의 저장소 기록을 비교했을 때 소스코드의 차이가 심한 저장소의 경우, 병합 오류가 날 것을 대비하여 오류 메시지를 띄우는 것 입니다.
        - 참고 사이트 [https://ndb796.tistory.com/275](https://ndb796.tistory.com/275)
    - [rejected] master → master (non-fast-forward) : gitignore 파일 또는 [README.md](http://README.md) 파일의 문제로 인해 발생
        - 참고 사이트 [https://somjang.tistory.com/entry/Git-rejected-master-master-non-fast-forward-해결-방법](https://somjang.tistory.com/entry/Git-rejected-master-master-non-fast-forward-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95)
- 테마 변경 후 블로그 환경 설정을 위해 사이드바 메뉴 설정 및 RSS feed 등 변경 중 일부 환경 설정들의 변경이 안되어 확인을 위해 작업한 terminal 을 체크하니 특이점 발생
    - tranquilpeak 환경 설정 변경 참고 사이트 [https://wonderbout.tistory.com/127](https://wonderbout.tistory.com/127)
    - On branch master
    nothing to commit, working tree clean
    Everything up-to-date
    branch 'master' set up to track
    
    ![png](images/Github(hexo)/Github_blo%207494b/%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2022-04-10_230334.png)
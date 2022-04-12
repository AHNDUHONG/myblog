---
title: "Github_blog(hexo) 프로필 설정"
author: "winters"
date: '2022-04-12'
categories: 'blog'
tags: 'blog'
---

### Github blog (hexo) bio(인물소개), job 설정

- 이 글은 Github blog를 관리 및 운영하는데 필자가 겪은 에러, 어려움 등을 해결하는 과정을 기록할 목적으로 만들어졌습니다.
- 참고: 필자는 tranquilpeak 테마를 표준 테마로 하여 환경 설정 하는 것 이므로 tranquilpeak 테마를 설정 한 뒤 이 글을 보시길 바랍니다.
    - tranquilpeak 테마 : [https://github.com/kakawait/hugo-tranquilpeak-theme](https://github.com/kakawait/hugo-tranquilpeak-theme)
    - 이전 글 : ****Github_blog(hexo) 테마 변경 및 환경 설정**** [https://ahnduhong.github.io/2022/04/12/Github(hexo)_blog_settings_01/](https://ahnduhong.github.io/2022/04/12/Github(hexo)_blog_settings_01/)

---

### 개요

- 블로그 관리를 하는 도중 side bar 메뉴에서 [author.bio](http://author.bio) 라고 써져 있는 것 과 프로필에 직업이 제대로 적혀 있지 않아 필자에 의도에 맞게 수정

![png](images/Github(hexo)_blog_settings_02/1.png)

- bio 와 job 메뉴는 side bar 를 수정 할 수 있는 {project_name}/themes/tranquilpeak/_config.yml 에서 수정하는 것이 아닌  {project_name}/themes/tranquilpeak/languages/en.yml 파일에서 수정이 가능하다. (필자의 언어 설정은 “en”이므로 “ko”를 설정한 경우 같은 경로의 ko.yml 파일을 수정하면 됨)
    - 아래 사진은 ko.yml 파일의 코드를 나열 한 것이다.

```bash
# {project_name}/themes/tranquilpeak/languages/ko.yml
# 블로그의 모든 곳에 표시되는 날짜 형식
date_format: "YYYY/MM/DD"

global:
    home: "Home"
    categories: "카테고리"
    category: "카테고리"
    tags: "태그"
    tag: "태그"
    archives: "아카이브"
    search: "검색"
    about: "About"
    author_picture: "저자 이미지"
    github: "GitHub"
    stack_overflow: "Stack Overflow"
    twitter: "Twitter"
    facebook: "Facebook"
    google_plus: "Google +"
    weibo: "Weibo"
    qq: "QQ"
    qzone: "Qzone"
    renren: "Renren"
    vk: "VK"
    odnoklassniki: "Odnoklassniki"
    linkedin: "LinkedIn"
    mail: "Mail"
    rss: "RSS"
    share_on_facebook: "Facebook에 공유하기"
    share_on_twitter: "Twitter에 공유하기"
    share_on_google_plus: "Google+에 공유하기"
    share_on_weibo: "Weibo에 공유하기"
    share_on_qq: "QQ에 공유하기"
    share_on_qzone: "Qzone에 공유하기"
    share_on_renren: "Renren에 공유하기"
    share_on_vk: "VK에 공유하기"
    share_on_odnoklassniki: "Odnoklassniki에 공유하기"
    search_category: "카테고리 검색"
    search_tag: "태그 검색"
    search_date: "날짜 검색 (YYYY/MM/DD)"
    posts_found:
        zero: "포스트가 없습니다."
        one: "1 개의 포스트가 있습니다."
        other: "{n} 개의 포스트가 있습니다."
    categories_found:
        zero: "카테고리가 없습니다."
        one: "1 개의 카테고리가 있습니다."
        other: "{n} 개의 카테고리가 있습니다."
    tags_found:
        zero: "태그가 없습니다."
        one: "1 개의 태그가 있습니다."
        other: "{n} 개의 태그가 있습니다."
    read_more_about_author: "저자에 대해 더 알아보기"
    zoom_in_on_picture: "사진 확대"
    go_to_homepage: "홈페이지로 이동하기"
    open_link: "링크 열기"
    open_post: "소식 열기"

pagination:
    page: "page %d"
    of: "of %d"
    newer_posts: "최근 포스트"
    older_posts: "이전 포스트"
    previous: "이전"
    next: "다음"

post:
    no_title : "제목 없음"
    categorized_in: "카테고리"
    tagged_in: "태그"
    toc: "목차"
    back_to_top: "맨 위로"
    read_more: "계속 읽기"
    go_to_website: "웹 사이트로 이동"
    comment_and_share: "댓글 공유"
    comment: "댓글을 남겨주세요"
    share: "이 포스트 공유하기"
    gallery: "갤러리"
    image:
        one: "이미지"
        other: "%d 이미지"

author:
    # Your biography (마크다운과 HTML이 지원됩니다.)
    bio: ""
    # Your job
    job: ""
```

- 맨 아래에 위치한 author 부분이 bio 와 job 즉, 필자가 변경을 원하던 메뉴 이므로 수정 bio(인물소개), job(직업) 안에 원하는 문구 및 파일(bio)을 수정한다.

![png](images/Github(hexo)_blog_settings_02/1.png)
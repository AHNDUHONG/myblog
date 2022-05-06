---
title: '[Vs code] Microsoft Visual Studio Code unins000.exe 오류'
author: 'winters'
date: '2022-05-06'
categories: 'Error'
tags: 'Vs code'
---

- 이 글은 필자가 경험한 오류를 해결하는 과정을 기록한 내용입니다.

---

# 개요

- Microsoft Visual Studio(Vs code) unins000.exe 액세스 거부로 인한 설치 오류가 발생하여 해결하는 과정을 설명한다.

# Unins000.exe 오류

- Vs code를 사용하는 도중 Microsoft Visual Studio(Vs code) unins000.exe 액세스 거부 오류가 발생했다.
  ![png](/images/VS_code_unins000_error/1.png)
  ***
- unins000.exe 에러는 “실행시간 에러”로 프로그램을 실행 중에 발생하는 에러다, 이 에러는 Microsoft Visual Studio Code(Vs code) 프로그램의 새로운 업데이트를 실행 하려는데 사용자의 권한이 없어 발생하는 오류이다.

# 오류 해결방법

- 오류 해결 방법으로는 Microsoft Visual Studio Code(VS code)가 설치되어 있는 폴더의 권한을 변경하여 액세스 오류를 해결할 수 있다.
  - Microsoft VS code 폴더(기본 설치 경로는 C:/Programfiles/Microsoft VS code) 속성 보안 사용자에 모든 권한 허용으로 변경한 뒤 적용을 한다.
  - VS code를 실행할 때 관리자 권한으로 실핸한다.

[https://github.com/microsoft/vscode/issues/75367](https://github.com/microsoft/vscode/issues/75367)

- 참고 URL: [https://redcow77.tistory.com/471](https://redcow77.tistory.com/471)

# Backpackerz frontend

## Description

    여행을 사랑하는 사용자들이 모여 일정과 추억, 도움을 공유하는 서비스를 만들어 보고자합니다.


    1차. 에디터와 캘린더를 포함한 포스팅.
    2차. 캔버스 맵으로 일정보기 추가.
    ...

## Environment

    node v14.17.5

    "next": "12.1.5"
    "react": "^18.0.0"
    ...

## Packages

#### backpackerz-core

-   itinerary
    -   api
    -   ...
-   session
-   story
-   user
-   ...
-   lib
    -   http
-   variables
    -   constants
    -   enums

#### backpackerz-components

모든 컴포넌트 패키지를 여기에 위치하도록 변경

-   components
    -   atoms
        -   buttons
        -   input
        -   brand
        -   ...
    -   molecules
        -   cars
        -   grid
        -   tab
        -   ...
    -   organisms
        -   modal
        -   editor
        -   timetable
        -   Calendar
-   hooks
-   lib
-   styles
-   variables
    -   constants
        -   user-interface
        -   styles
        -   ...
    -   enums

#### backpackerz-frontend

-   components
    -   itinerary
    -   user
    -   ...
-   layouts
-   hooks
-   lib
-   modules (store)
-   styles
-   variables

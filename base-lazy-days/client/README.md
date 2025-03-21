# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## useIsFetching

현재 가져오는 쿼리가 있는지 check 해주는 훅 (대규모 프로젝트에서 사용)
로딩 스피너 표시

## Cache Prefetching

**React Query로 데이터를 미리 적재하는 방법**

|                 |     where to use     | data from | added to cache |
| :-------------: | :------------------: | :-------: | :------------: |
|  prefetchQuery  | queryClient (method) |  server   |       O        |
|  setQueryData   | queryClient (method) |  client   |       O        |
| placeholderData |  useQuery (option)   |  client   |       X        |
|   initialData   |  useQuery (option)   |  client   |       O        |

## useQuery의 select 옵션

- 리액트 쿼리는 이를 최적화 하고, 불필요한 계산을 줄이기 위해 기억한다.
- 리액트 쿼리는 선택 함수의 삼중 등호 비교를 수행하고, 데이터가 변경되거나 함수가 변경된 경우에만 선택함수룰 실행한다.
- 데이터가 마지막으로 데이터를 검색했을 떄와 동일하고 선택함수가 동일한 경우 선택 함수를 다시 실행하지 않는다.
- 익명 함수에서 안정적인 함수를 만들고 싶다면, useCallback 함수(함수를 기억하는 훅)를 사용할 수 있다.

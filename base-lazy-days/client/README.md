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

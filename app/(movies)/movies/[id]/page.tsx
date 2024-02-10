import { Suspense } from 'react';
import MovieInfo, { getMovie } from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-viedos';

interface IParams {
  params: {
    id: string;
  };
}
export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  // 이전 NextJS였으면 안좋은 방법일 수 있었으나, 현재 NextJS는 캐싱을 지원하기 때문에 같은 정보를 여러번 fetch해도 무방하다.
  return {
    title: movie.title,
  };
}

export default async function MovieDetail({ params: { id } }: IParams) {
  return (
    <div>
      <h3>Movie Detail Page</h3>
      <Suspense fallback={<h1>Loading movie Info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading videos Info</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

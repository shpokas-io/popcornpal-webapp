import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../features/movies/movieThunks";
import type { RootState, AppDispatch } from "../app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useFetchMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
};

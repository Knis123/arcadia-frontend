import { useQuery } from '@tanstack/react-query';



const useFetchById = (fetchFn, id) => {
  return useQuery({
    queryKey: ['foodRecords', id], // Unique key for the query
    queryFn: () => fetchFn(id),
    enabled: !!id, // Ensures the query only runs if `id` is valid
  });
};

export default useFetchById;
import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  count,
  options: IPaginationOptions,
) => {
  return {
    page: options.page,
    limit: options.limit,
    count,
    data,
  };
};

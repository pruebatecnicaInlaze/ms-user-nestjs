export const ExampleDocsOpenApi = {
  successListAllUsers: {
    succeeded: true,
    result: [
      {
        id: '90f4c913-d5c4-4600-b7ea-06b7780f1cad',
        fullName: 'Hernan Velasquez2',
        email: 'hernan@algo.com',
        createAt: '2025-01-02T02:00:52.219Z',
      },
      {
        id: 'b2583e4c-fdb5-4c90-907c-3007416e60e6',
        fullName: 'Hernan Velasquez',
        email: 'hernan2@algo.com',
        createAt: '2025-01-02T04:14:42.251Z',
      },
    ],
  },
  successByEmailUser: {
    succeeded: true,
    result: {
      id: '90f4c913-d5c4-4600-b7ea-06b7780f1cad',
      fullName: 'Hernan Velasquez2',
      email: 'hernan@algo.com',
      createAt: '2025-01-02T02:00:52.219Z',
    },
  },
  errorNotFoundUser: {
    succeeded: false,
    result: null,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      error: '"Cannot read properties of undefined (reading \'id\')"',
      title: 'Internal Server Error',
    },
  },

  registerSuccess: {
    succeeded: true,
    result: {
      id: 'b2583e4c-fdb5-4c90-907c-3007416e60e6',
      fullName: 'Hernan Velasquez',
      email: 'hernan2@algo.com',
      createAt: '2025-01-02T04:14:42.251Z',
    },
  },
};

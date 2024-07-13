import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Request, Response } from 'express';
import { DateScalar } from './scalars/date.scalar';

export type GraphqlContext = {
  req: Request;
  res: Response;
};

@Module({
  providers: [DateScalar],
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [],
      inject: [],
      useFactory: () => {
        return {
          context: ({ req, res }): GraphqlContext => ({
            req,
            res,
          }),
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          path: '/graphql',
          playground: false,
          introspection: process.env.NAMESPACE !== 'production',
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          persistedQueries: false,
          fieldResolverEnhancers: ['interceptors', 'guards'],
        };
      },
    }),
  ],
})
export class GraphqlModule {}

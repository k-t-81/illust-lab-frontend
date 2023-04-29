import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents binary data as Base64-encoded strings, using the standard alphabet. */
  Base64: any;
  /** Date with time (isoformat) */
  DateTime: any;
};

export type ControlnetIllustration = {
  __typename?: 'ControlnetIllustration';
  controlnetConditioningScale: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  guidanceScale: Scalars['Float'];
  id: Scalars['Int'];
  illustrationModel: IllustrationModel;
  illustrationModelId: Scalars['Int'];
  illustrationNegativePrompt: IllustrationPrompt;
  illustrationNegativePromptId: Scalars['Int'];
  illustrationPrompt: IllustrationPrompt;
  illustrationPromptId: Scalars['Int'];
  numInferenceSteps: Scalars['Int'];
  parentImage: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ControlnetIllustrationGenerateInput = {
  controlnetConditioningScale: Scalars['Float'];
  controlnetModel: Scalars['String'];
  groupId: Scalars['Int'];
  guidanceScale: Scalars['Float'];
  model: Scalars['String'];
  negativePrompt: Scalars['String'];
  numInferenceSteps: Scalars['Int'];
  parentImageBinary?: InputMaybe<Scalars['Base64']>;
  parentImagePath?: InputMaybe<Scalars['String']>;
  prompt: Scalars['String'];
  seed: Scalars['Int'];
};

export type ControlnetIllustrationPost = {
  __typename?: 'ControlnetIllustrationPost';
  id: Scalars['Int'];
  image: Scalars['String'];
  seed: Scalars['Int'];
};

export type ControlnetIllustrationType = {
  __typename?: 'ControlnetIllustrationType';
  illustration: ControlnetIllustration;
  posts: Array<ControlnetIllustrationPost>;
};

export type ControlnetIllustrationTypeImg2ImgIllustrationTypeTxt2ImgIllustrationType =
  | ControlnetIllustrationType
  | Img2ImgIllustrationType
  | Txt2ImgIllustrationType;

export type CreateIllustrationPostGroupInput = {
  name: Scalars['String'];
};

export type DeleteIllustrationPostGroupInput = {
  id: Scalars['Int'];
};

export type IllustrationModel = {
  __typename?: 'IllustrationModel';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  model: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IllustrationPostGroup = {
  __typename?: 'IllustrationPostGroup';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IllustrationPostGroupCreate = {
  __typename?: 'IllustrationPostGroupCreate';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type IllustrationPostGroups = {
  __typename?: 'IllustrationPostGroups';
  illustrationPostGroups: Array<IllustrationPostGroup>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type IllustrationPrompt = {
  __typename?: 'IllustrationPrompt';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type Illustrations = {
  __typename?: 'Illustrations';
  illustrations: Array<ControlnetIllustrationTypeImg2ImgIllustrationTypeTxt2ImgIllustrationType>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Img2ImgIllustration = {
  __typename?: 'Img2ImgIllustration';
  createdAt: Scalars['DateTime'];
  guidanceScale: Scalars['Float'];
  id: Scalars['Int'];
  illustrationModel: IllustrationModel;
  illustrationModelId: Scalars['Int'];
  illustrationNegativePrompt: IllustrationPrompt;
  illustrationNegativePromptId: Scalars['Int'];
  illustrationPrompt: IllustrationPrompt;
  illustrationPromptId: Scalars['Int'];
  numInferenceSteps: Scalars['Int'];
  parentImage: Scalars['String'];
  strength: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Img2ImgIllustrationGenerateInput = {
  groupId: Scalars['Int'];
  guidanceScale: Scalars['Float'];
  model: Scalars['String'];
  negativePrompt: Scalars['String'];
  numInferenceSteps: Scalars['Int'];
  parentImageBinary?: InputMaybe<Scalars['Base64']>;
  parentImagePath?: InputMaybe<Scalars['String']>;
  prompt: Scalars['String'];
  seed: Scalars['Int'];
  strength: Scalars['Float'];
};

export type Img2ImgIllustrationPost = {
  __typename?: 'Img2ImgIllustrationPost';
  id: Scalars['Int'];
  image: Scalars['String'];
  seed: Scalars['Int'];
};

export type Img2ImgIllustrationType = {
  __typename?: 'Img2ImgIllustrationType';
  illustration: Img2ImgIllustration;
  posts: Array<Img2ImgIllustrationPost>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createIllustrationGroup: IllustrationPostGroupCreate;
  deleteIllustrationGroup: Scalars['Boolean'];
  generateControlnetIllustration: Scalars['String'];
  generateImg2imgIllustration: Scalars['String'];
  generateTxt2imgIllustration: Scalars['String'];
  updateIllustrationGroup: IllustrationPostGroup;
};

export type MutationCreateIllustrationGroupArgs = {
  input: CreateIllustrationPostGroupInput;
};

export type MutationDeleteIllustrationGroupArgs = {
  input: DeleteIllustrationPostGroupInput;
};

export type MutationGenerateControlnetIllustrationArgs = {
  input: ControlnetIllustrationGenerateInput;
};

export type MutationGenerateImg2imgIllustrationArgs = {
  input: Img2ImgIllustrationGenerateInput;
};

export type MutationGenerateTxt2imgIllustrationArgs = {
  input: Txt2ImgIllustrationGenerateInput;
};

export type MutationUpdateIllustrationGroupArgs = {
  input: UpdateIllustrationPostGroupInput;
};

export type Query = {
  __typename?: 'Query';
  readIllustrationGroup: IllustrationPostGroup;
  readIllustrationGroups: IllustrationPostGroups;
  readIllustrationGroupsCount: Scalars['Int'];
  readIllustrations: Illustrations;
  readIllustrationsCount: Scalars['Int'];
};

export type QueryReadIllustrationGroupArgs = {
  id: Scalars['Int'];
};

export type QueryReadIllustrationGroupsArgs = {
  offset: Scalars['Int'];
};

export type QueryReadIllustrationsArgs = {
  groupId: Scalars['Int'];
  offset: Scalars['Int'];
};

export type QueryReadIllustrationsCountArgs = {
  groupId: Scalars['Int'];
};

export type Txt2ImgIllustration = {
  __typename?: 'Txt2ImgIllustration';
  createdAt: Scalars['DateTime'];
  guidanceScale: Scalars['Float'];
  height: Scalars['Int'];
  id: Scalars['Int'];
  illustrationModel: IllustrationModel;
  illustrationModelId: Scalars['Int'];
  illustrationNegativePrompt: IllustrationPrompt;
  illustrationNegativePromptId: Scalars['Int'];
  illustrationPrompt: IllustrationPrompt;
  illustrationPromptId: Scalars['Int'];
  numInferenceSteps: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
};

export type Txt2ImgIllustrationGenerateInput = {
  groupId: Scalars['Int'];
  guidanceScale: Scalars['Float'];
  height: Scalars['Int'];
  model: Scalars['String'];
  negativePrompt: Scalars['String'];
  numInferenceSteps: Scalars['Int'];
  prompt: Scalars['String'];
  seed: Scalars['Int'];
  width: Scalars['Int'];
};

export type Txt2ImgIllustrationPost = {
  __typename?: 'Txt2ImgIllustrationPost';
  id: Scalars['Int'];
  image: Scalars['String'];
  seed: Scalars['Int'];
};

export type Txt2ImgIllustrationType = {
  __typename?: 'Txt2ImgIllustrationType';
  illustration: Txt2ImgIllustration;
  posts: Array<Txt2ImgIllustrationPost>;
};

export type UpdateIllustrationPostGroupInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ReadIllustrationsQueryVariables = Exact<{
  groupId: Scalars['Int'];
  offset: Scalars['Int'];
}>;

export type ReadIllustrationsQuery = {
  __typename?: 'Query';
  readIllustrationsCount: number;
  readIllustrations: {
    __typename: 'Illustrations';
    offset: number;
    limit: number;
    illustrations: Array<
      | {
          __typename: 'ControlnetIllustrationType';
          illustration: {
            __typename?: 'ControlnetIllustration';
            id: number;
            numInferenceSteps: number;
            guidanceScale: number;
            controlnetConditioningScale: number;
            parentImage: string;
            createdAt: any;
            updatedAt: any;
            illustrationPrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationNegativePrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationModel: { __typename?: 'IllustrationModel'; model: string };
          };
          posts: Array<{ __typename?: 'ControlnetIllustrationPost'; id: number; seed: number; image: string }>;
        }
      | {
          __typename: 'Img2ImgIllustrationType';
          illustration: {
            __typename?: 'Img2ImgIllustration';
            id: number;
            numInferenceSteps: number;
            guidanceScale: number;
            strength: number;
            parentImage: string;
            createdAt: any;
            updatedAt: any;
            illustrationPrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationNegativePrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationModel: { __typename?: 'IllustrationModel'; model: string };
          };
          posts: Array<{ __typename?: 'Img2ImgIllustrationPost'; id: number; seed: number; image: string }>;
        }
      | {
          __typename: 'Txt2ImgIllustrationType';
          illustration: {
            __typename?: 'Txt2ImgIllustration';
            id: number;
            numInferenceSteps: number;
            guidanceScale: number;
            height: number;
            width: number;
            createdAt: any;
            updatedAt: any;
            illustrationPrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationNegativePrompt: { __typename?: 'IllustrationPrompt'; value: string };
            illustrationModel: { __typename?: 'IllustrationModel'; model: string };
          };
          posts: Array<{ __typename?: 'Txt2ImgIllustrationPost'; id: number; seed: number; image: string }>;
        }
    >;
  };
};

export type ReadIllustrationGroupsQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;

export type ReadIllustrationGroupsQuery = {
  __typename?: 'Query';
  readIllustrationGroupsCount: number;
  readIllustrationGroups: {
    __typename?: 'IllustrationPostGroups';
    limit: number;
    offset: number;
    illustrationPostGroups: Array<{
      __typename?: 'IllustrationPostGroup';
      id: number;
      name: string;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type ReadIllustrationGroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type ReadIllustrationGroupQuery = {
  __typename?: 'Query';
  readIllustrationGroup: {
    __typename?: 'IllustrationPostGroup';
    id: number;
    name: string;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreateIllustrationGroupMutationVariables = Exact<{
  input: CreateIllustrationPostGroupInput;
}>;

export type CreateIllustrationGroupMutation = {
  __typename?: 'Mutation';
  createIllustrationGroup: { __typename?: 'IllustrationPostGroupCreate'; id: number; name: string };
};

export type UpdateIllustrationGroupMutationVariables = Exact<{
  input: UpdateIllustrationPostGroupInput;
}>;

export type UpdateIllustrationGroupMutation = {
  __typename?: 'Mutation';
  updateIllustrationGroup: { __typename?: 'IllustrationPostGroup'; id: number; name: string };
};

export type DeleteIllustrationGroupMutationVariables = Exact<{
  input: DeleteIllustrationPostGroupInput;
}>;

export type DeleteIllustrationGroupMutation = { __typename?: 'Mutation'; deleteIllustrationGroup: boolean };

export type GenerateTxt2ImgIllustrationMutationVariables = Exact<{
  input: Txt2ImgIllustrationGenerateInput;
}>;

export type GenerateTxt2ImgIllustrationMutation = { __typename?: 'Mutation'; generateTxt2imgIllustration: string };

export type GenerateImg2ImgIllustrationMutationVariables = Exact<{
  input: Img2ImgIllustrationGenerateInput;
}>;

export type GenerateImg2ImgIllustrationMutation = { __typename?: 'Mutation'; generateImg2imgIllustration: string };

export type GenerateControlnetIllustrationMutationVariables = Exact<{
  input: ControlnetIllustrationGenerateInput;
}>;

export type GenerateControlnetIllustrationMutation = {
  __typename?: 'Mutation';
  generateControlnetIllustration: string;
};

export const ReadIllustrationsDocument = gql`
  query readIllustrations($groupId: Int!, $offset: Int!) {
    readIllustrations(groupId: $groupId, offset: $offset) {
      __typename
      offset
      limit
      illustrations {
        __typename
        ... on ControlnetIllustrationType {
          illustration {
            id
            numInferenceSteps
            guidanceScale
            controlnetConditioningScale
            parentImage
            createdAt
            updatedAt
            illustrationPrompt {
              value
            }
            illustrationNegativePrompt {
              value
            }
            illustrationModel {
              model
            }
          }
          posts {
            id
            seed
            image
          }
        }
        ... on Img2ImgIllustrationType {
          __typename
          illustration {
            id
            numInferenceSteps
            guidanceScale
            strength
            parentImage
            createdAt
            updatedAt
            illustrationPrompt {
              value
            }
            illustrationNegativePrompt {
              value
            }
            illustrationModel {
              model
            }
          }
          posts {
            id
            seed
            image
          }
        }
        ... on Txt2ImgIllustrationType {
          __typename
          illustration {
            id
            numInferenceSteps
            guidanceScale
            height
            width
            createdAt
            updatedAt
            illustrationPrompt {
              value
            }
            illustrationNegativePrompt {
              value
            }
            illustrationModel {
              model
            }
          }
          posts {
            id
            seed
            image
          }
        }
      }
    }
    readIllustrationsCount(groupId: $groupId)
  }
`;

export function useReadIllustrationsQuery(options: Omit<Urql.UseQueryArgs<ReadIllustrationsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReadIllustrationsQuery, ReadIllustrationsQueryVariables>({
    query: ReadIllustrationsDocument,
    ...options,
  });
}
export const ReadIllustrationGroupsDocument = gql`
  query readIllustrationGroups($offset: Int!) {
    readIllustrationGroups(offset: $offset) {
      limit
      offset
      illustrationPostGroups {
        id
        name
        createdAt
        updatedAt
      }
    }
    readIllustrationGroupsCount
  }
`;

export function useReadIllustrationGroupsQuery(
  options: Omit<Urql.UseQueryArgs<ReadIllustrationGroupsQueryVariables>, 'query'>
) {
  return Urql.useQuery<ReadIllustrationGroupsQuery, ReadIllustrationGroupsQueryVariables>({
    query: ReadIllustrationGroupsDocument,
    ...options,
  });
}
export const ReadIllustrationGroupDocument = gql`
  query readIllustrationGroup($id: Int!) {
    readIllustrationGroup(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export function useReadIllustrationGroupQuery(
  options: Omit<Urql.UseQueryArgs<ReadIllustrationGroupQueryVariables>, 'query'>
) {
  return Urql.useQuery<ReadIllustrationGroupQuery, ReadIllustrationGroupQueryVariables>({
    query: ReadIllustrationGroupDocument,
    ...options,
  });
}
export const CreateIllustrationGroupDocument = gql`
  mutation createIllustrationGroup($input: CreateIllustrationPostGroupInput!) {
    createIllustrationGroup(input: $input) {
      id
      name
    }
  }
`;

export function useCreateIllustrationGroupMutation() {
  return Urql.useMutation<CreateIllustrationGroupMutation, CreateIllustrationGroupMutationVariables>(
    CreateIllustrationGroupDocument
  );
}
export const UpdateIllustrationGroupDocument = gql`
  mutation updateIllustrationGroup($input: UpdateIllustrationPostGroupInput!) {
    updateIllustrationGroup(input: $input) {
      id
      name
    }
  }
`;

export function useUpdateIllustrationGroupMutation() {
  return Urql.useMutation<UpdateIllustrationGroupMutation, UpdateIllustrationGroupMutationVariables>(
    UpdateIllustrationGroupDocument
  );
}
export const DeleteIllustrationGroupDocument = gql`
  mutation deleteIllustrationGroup($input: DeleteIllustrationPostGroupInput!) {
    deleteIllustrationGroup(input: $input)
  }
`;

export function useDeleteIllustrationGroupMutation() {
  return Urql.useMutation<DeleteIllustrationGroupMutation, DeleteIllustrationGroupMutationVariables>(
    DeleteIllustrationGroupDocument
  );
}
export const GenerateTxt2ImgIllustrationDocument = gql`
  mutation generateTxt2ImgIllustration($input: Txt2ImgIllustrationGenerateInput!) {
    generateTxt2imgIllustration(input: $input)
  }
`;

export function useGenerateTxt2ImgIllustrationMutation() {
  return Urql.useMutation<GenerateTxt2ImgIllustrationMutation, GenerateTxt2ImgIllustrationMutationVariables>(
    GenerateTxt2ImgIllustrationDocument
  );
}
export const GenerateImg2ImgIllustrationDocument = gql`
  mutation generateImg2ImgIllustration($input: Img2ImgIllustrationGenerateInput!) {
    generateImg2imgIllustration(input: $input)
  }
`;

export function useGenerateImg2ImgIllustrationMutation() {
  return Urql.useMutation<GenerateImg2ImgIllustrationMutation, GenerateImg2ImgIllustrationMutationVariables>(
    GenerateImg2ImgIllustrationDocument
  );
}
export const GenerateControlnetIllustrationDocument = gql`
  mutation generateControlnetIllustration($input: ControlnetIllustrationGenerateInput!) {
    generateControlnetIllustration(input: $input)
  }
`;

export function useGenerateControlnetIllustrationMutation() {
  return Urql.useMutation<GenerateControlnetIllustrationMutation, GenerateControlnetIllustrationMutationVariables>(
    GenerateControlnetIllustrationDocument
  );
}

import { z } from 'zod';

export const ArticleScalarFieldEnumSchema = z.enum(['id','title','content','writer']);

export default ArticleScalarFieldEnumSchema;

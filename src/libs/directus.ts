import { Directus } from "@directus/sdk";

interface BusinessDirectusUsersCollection {
  business_id?: {
    id: number;
  };
  directus_users_id?: {
    id: string;
  };
}

interface BusinessCollection {
  id: number;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;

  type: string;
  operator: BusinessDirectusUsersCollection[];
  content?: string;
}

interface BusinessDefinitionCollection {
  id: number;
  definition: string;
}

type HelperDirectus = {
  business: BusinessCollection;
  BusinessDefinition: BusinessDefinitionCollection;
};

export const directus = new Directus<HelperDirectus>("/api/");

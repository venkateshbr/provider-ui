import { ProviderBasic } from "./providerbasic";
import { ProviderAddress } from "./provideraddress";
import { ProviderIdentifier } from "./provideridentifier";
import { ProviderTaxonomy } from "./providertaxonomy";

export interface Provider {
    addresses: ProviderAddress[];
    basic: ProviderBasic;
    created_epoch: number;
    enumeration_type: String;
    identifiers: ProviderIdentifier[];
    last_updated_epoch: number;
    number: number;
    other_names: any[];
    taxonomies: ProviderTaxonomy[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: relationFields
// ====================================================

export interface relationFields_em_relationType_title {
    value: string;
}

export interface relationFields_em_relationType {
    title: relationFields_em_relationType_title | null;
}

export interface relationFields_em_when_rdfs_label {
    value: string;
}

export interface relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_tim_unknown {}

export interface relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span_em_latestStart_ {
    value: string;
}

export interface relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span_em_earliestEnd_ {
    value: string;
}

export interface relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span {
    em_latestStart_: relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span_em_latestStart_ | null;
    em_earliestEnd_: relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span_em_earliestEnd_ | null;
}

export type relationFields_em_when_em_timespan =
    | relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_tim_unknown
    | relationFields_em_when_em_timespan_ue85b462c027ef2b282bf87b44e9670ebb085715d__emlo_oppole20180627_em_Time_span;

export interface relationFields_em_when {
    rdfs_label: relationFields_em_when_rdfs_label | null;
    em_timespan: relationFields_em_when_em_timespan | null;
}

export interface relationFields {
    em_relationType: relationFields_em_relationType | null;
    em_when: relationFields_em_when | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================

export interface StartedBySubstitute {
  last_connection: string;
  created_by_user_id: string;
  creation_date: string;
  id: string;
  icon: string;
  enabled: string;
  title: string;
  manager_id: string;
  job_title: string;
  userName: string;
  lastname: string;
  firstname: string;
  password: string;
  last_update_date: string;
}

export interface StartedBy {
  last_connection: string;
  created_by_user_id: string;
  creation_date: string;
  id: string;
  icon: string;
  enabled: string;
  title: string;
  manager_id: string;
  job_title: string;
  userName: string;
  lastname: string;
  firstname: string;
  password: string;
  last_update_date: string;
}

export interface ProcessDefinitionId {
  id: string;
  icon: string;
  displayDescription: string;
  deploymentDate: string;
  description: string;
  activationState: string;
  name: string;
  deployedBy: string;
  displayName: string;
  actorinitiatorid: string;
  last_update_date: string;
  configurationState: string;
  version: string;
}

export interface iListCaseForClient {
  id: string;
  end_date: string;
  failedFlowNodes: string;
  startedBySubstitute: StartedBySubstitute;
  start: string;
  activeFlowNodes: string;
  state: string;
  rootCaseId: string;
  started_by: StartedBy;
  processDefinitionId: ProcessDefinitionId;
  last_update_date: string;
  searchIndex1Label: string;
  searchIndex2Label: string;
  searchIndex3Label: string;
  searchIndex4Label: string;
  searchIndex5Label: string;
  searchIndex1Value: string;
  searchIndex2Value: string;
  searchIndex3Value: string;
  searchIndex4Value: string;
  searchIndex5Value: string;
}

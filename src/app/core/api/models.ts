// Generated lightweight types from swagger.json (hand-curated)
// Keep minimal to avoid duplication with existing shared interfaces.

export interface UpdateAcademicProgramCommand {
  id: number;
  estado: boolean;
}

export interface CreateAgreegementsCommand {
  nombre?: string | null;
  codigo?: string | null;
  vigenciaMaximaCertificado?: string | null;
  estado: boolean;
}

export interface UpdateAgreegementsCommand extends CreateAgreegementsCommand {
  id: number;
}

export interface CreateCertificationLevelCommand {
  initialNumericalScale: number;
  finalNumericalScale: number;
  parameterId: number;
}

export interface UpdateCertificationLevelCommand extends CreateCertificationLevelCommand {
  id: number;
}

export interface DeleteCertificationLevelCommand {
  id: number;
}

export interface CreateParameterCommand {
  name?: string | null;
  observation?: string | null;
  parameterCategoryId: number;
}

export interface UpdateParameterCommand {
  id: number;
  name?: string | null;
  observation?: string | null;
  categoryId: number;
}

export interface CreateParameterCategoryCommand {
  name?: string | null;
}

export interface UpdateParameterCategoryCommand {
  id: number;
  description?: string | null;
}

export interface CreateReviewerCommand {
  name?: string | null;
  email?: string | null;
  requestLimit?: number | null;
  modality?: string | null;
  campus?: string | null;
}

export interface UpdateReviewerCommand extends CreateReviewerCommand {
  id: number;
}

// Minimal DTOs inferred for reads
export interface AcademicProgramDTO {
  id: number;
  nombre?: string;
  estado?: boolean;
  modo?: string;
  nivel?: string;
  sede?: string;
}

export interface AgreementDTO {
  id: number;
  nombre?: string;
  codigo?: string;
  vigenciaMaximaCertificado?: string;
  estado?: boolean;
}

export interface CertificationLevelDTO {
  id: number;
  initialNumericalScale: number;
  finalNumericalScale: number;
  parameterId: number;
}

export interface ParameterGeneralDTO {
  id: number;
  name?: string | null;
  observation?: string | null;
  parameterCategoryId: number;
  parameterCategoryName?: string | null;
  updatedAt?: string | null;
}

export interface ParameterCategoryDTO {
  id: number;
  name?: string | null;
  description?: string | null;
}

export interface ReviewerDTO {
  id: number;
  name?: string | null;
  email?: string | null;
  isActive?: boolean;
  requestLimit?: number | null;
  modality?: string | null;
  campus?: string | null;
}

// Student Request
export interface StudentRequestDTO {
  id: number;
  user?: string | null;
  reviewer?: string | null;
  program?: string | null;
  modality?: string | null;
  language?: string | null;
  status?: string | null;
  createdAt?: string | null;
  dueDays?: number | null;
}

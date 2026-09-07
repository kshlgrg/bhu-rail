import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.db.engine import Base


class ParcelModel(Base):
    __tablename__ = "parcels"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ulpin = Column(String(64), unique=True, index=True, nullable=False)
    asset_id = Column(String(64), unique=True, index=True, nullable=False)
    version = Column(Integer, default=1, nullable=False)
    state_code = Column(String(10), default="HR", nullable=False)
    district = Column(String(64), nullable=False)
    tehsil = Column(String(64), nullable=False)
    village = Column(String(64), nullable=False)
    survey_number = Column(String(32), index=True, nullable=False)
    sub_division_number = Column(String(32), nullable=True)
    
    # PostGIS Polygon in WGS84 (SRID 4326)
    geometry = Column(Geometry(geometry_type="POLYGON", srid=4326, spatial_index=True), nullable=True)
    
    area_sq_meters = Column(Float, nullable=False)
    centroid = Column(JSONB, nullable=False)  # [lat, lng]
    accuracy_meters = Column(Float, default=0.05)
    survey_date = Column(String(32), nullable=False)
    status = Column(String(32), default="ACTIVE", index=True, nullable=False)
    state_hash = Column(String(64), nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    rights = relationship("LandRightModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    registrations = relationship("RegistrationModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    encumbrances = relationship("EncumbranceModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    disputes = relationship("DisputeModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    building_permissions = relationship("BuildingPermissionModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    property_tax = relationship("PropertyTaxModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    utilities = relationship("UtilityModel", back_populates="parcel", cascade="all, delete-orphan", lazy="selectin")
    land_use = relationship("LandUseZoningModel", back_populates="parcel", uselist=False, cascade="all, delete-orphan", lazy="selectin")
    master_plan = relationship("MasterPlanModel", back_populates="parcel", uselist=False, cascade="all, delete-orphan", lazy="selectin")


class LandRightModel(Base):
    __tablename__ = "land_rights"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    right_id = Column(String(64), unique=True, nullable=False)
    type = Column(String(64), nullable=False)
    holder_name = Column(String(128), nullable=False)
    holder_identity_hash = Column(String(64), nullable=False)
    share_fraction = Column(String(16), default="1/1", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    issuing_authority = Column(String(128), nullable=False)
    title_deed_doc_id = Column(String(64), nullable=False)
    title_deed_hash = Column(String(64), nullable=False)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="rights")


class RegistrationModel(Base):
    __tablename__ = "registrations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    registration_id = Column(String(64), unique=True, nullable=False)
    registration_type = Column(String(64), default="SALE_DEED", nullable=False)
    deed_document_id = Column(String(64), nullable=False)
    deed_document_hash = Column(String(64), nullable=False)
    buyer_name = Column(String(128), nullable=False)
    seller_name = Column(String(128), nullable=False)
    consideration_amount = Column(Float, default=0.0, nullable=False)
    registrar_office = Column(String(128), nullable=False)
    status = Column(String(32), default="REGISTERED", nullable=False)
    registration_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="registrations")


class EncumbranceModel(Base):
    __tablename__ = "encumbrances"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    encumbrance_id = Column(String(64), unique=True, nullable=False)
    type = Column(String(64), nullable=False)
    institution_name = Column(String(128), nullable=False)
    claim_amount_inr = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    reference_document_no = Column(String(64), nullable=False)
    remarks = Column(Text, nullable=True)
    date_registered = Column(DateTime(timezone=True), nullable=False)
    discharge_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="encumbrances")


class DisputeModel(Base):
    __tablename__ = "disputes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    dispute_id = Column(String(64), unique=True, nullable=False)
    type = Column(String(64), nullable=False)
    status = Column(String(32), default="FILED", nullable=False)
    case_number = Column(String(64), nullable=False)
    adjudicating_authority = Column(String(128), nullable=False)
    petitioner = Column(String(128), nullable=False)
    respondent = Column(String(128), nullable=False)
    claimed_area_sq_meters = Column(Float, nullable=True)
    injunction_freeze_transfers = Column(Boolean, default=False, nullable=False)
    injunction_freeze_mortgage = Column(Boolean, default=False, nullable=False)
    stay_order_doc_hash = Column(String(64), nullable=True)
    remarks = Column(Text, nullable=True)
    date_filed = Column(DateTime(timezone=True), nullable=False)
    last_hearing_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="disputes")


class LandUseZoningModel(Base):
    __tablename__ = "land_use_zoning"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, unique=True, nullable=False)
    land_use_category = Column(String(64), default="RESIDENTIAL", nullable=False)
    zoning_category = Column(String(64), default="R-2", nullable=False)
    permissible_far = Column(Float, default=1.75, nullable=False)
    building_height_limit_meters = Column(Float, default=15.0, nullable=False)
    is_acquisition_zone = Column(Boolean, default=False, nullable=False)
    is_flood_hazard_zone = Column(Boolean, default=False, nullable=False)
    environmental_clearance_required = Column(Boolean, default=False, nullable=False)
    source = Column(String(128), default="Gurugram Master Plan 2031", nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="land_use")


class MasterPlanModel(Base):
    __tablename__ = "master_plan_info"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, unique=True, nullable=False)
    plan_reference = Column(String(64), nullable=False)
    planning_authority = Column(String(128), default="DTCP Haryana / GMDA", nullable=False)
    zone_category = Column(String(64), nullable=False)
    development_status = Column(String(64), default="PLANNED", nullable=False)
    restriction_notes = Column(Text, nullable=True)
    plan_effective_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="master_plan")


class BuildingPermissionModel(Base):
    __tablename__ = "building_permissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    permission_id = Column(String(64), unique=True, nullable=False)
    application_number = Column(String(64), nullable=False)
    authority = Column(String(128), default="Municipal Corporation of Gurugram", nullable=False)
    approval_status = Column(String(32), default="APPROVED", nullable=False)
    building_type = Column(String(64), default="Residential G+2", nullable=False)
    approved_far = Column(Float, nullable=True)
    approved_area_sq_meters = Column(Float, nullable=True)
    remarks = Column(Text, nullable=True)
    permission_date = Column(DateTime(timezone=True), nullable=False)
    expiry_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="building_permissions")


class PropertyTaxModel(Base):
    __tablename__ = "property_tax"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    tax_record_id = Column(String(64), unique=True, nullable=False)
    assessment_reference = Column(String(64), nullable=False)
    assessment_year = Column(String(16), nullable=False)
    tax_status = Column(String(32), default="PAID", nullable=False)
    annual_tax_amount = Column(Float, default=0.0, nullable=False)
    outstanding_amount = Column(Float, default=0.0, nullable=False)
    last_payment_date = Column(DateTime(timezone=True), nullable=True)
    municipal_authority = Column(String(128), default="MCG Gurugram", nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="property_tax")


class UtilityModel(Base):
    __tablename__ = "utilities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    utility_id = Column(String(64), unique=True, nullable=False)
    utility_type = Column(String(64), nullable=False)
    provider_agency = Column(String(128), nullable=False)
    connection_status = Column(String(32), default="ACTIVE", nullable=False)
    connection_reference = Column(String(64), nullable=False)
    infrastructure_status = Column(String(64), default="CONNECTED", nullable=False)
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)

    parcel = relationship("ParcelModel", back_populates="utilities")


class LedgerBlockModel(Base):
    __tablename__ = "ledger_blocks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    index = Column(Integer, unique=True, index=True, nullable=False)
    ulpin = Column(String(64), index=True, nullable=False)
    transaction_id = Column(String(64), nullable=False)
    event_type = Column(String(64), nullable=False)
    previous_hash = Column(String(64), nullable=False)
    payload_hash = Column(String(64), nullable=False)
    state_after_transition_hash = Column(String(64), nullable=False)
    department_signatures = Column(JSONB, default=dict, nullable=False)
    block_hash = Column(String(64), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)


class ParcelLineageModel(Base):
    __tablename__ = "parcel_lineage"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parent_parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    child_parcel_id = Column(UUID(as_uuid=True), ForeignKey("parcels.id", ondelete="CASCADE"), index=True, nullable=False)
    genealogy_depth = Column(Integer, default=1, nullable=False)
    subdivision_timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)

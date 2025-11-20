import datetime as dt
import enum

from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime, Enum, Text

Base = declarative_base()


class InquiryStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(String, primary_key=True, index=True)
    service_name = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    message = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=dt.datetime.utcnow, nullable=False)

    # IMPORTANT FIX → store as VARCHAR instead of native ENUM
    status = Column(
        Enum(
            InquiryStatus,
            values_callable=lambda x: [e.value for e in x],
            native_enum=False,
        ),
        default=InquiryStatus.pending,
        nullable=False,
    )

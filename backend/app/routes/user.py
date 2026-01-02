from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..schemas.user import UserResponse
from ..utils.auth import get_current_user

router = APIRouter(prefix="/api/user", tags=["User"])

@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=UserResponse)
async def update_profile(
    full_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    current_user.full_name = full_name
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/is-admin")
async def check_admin_status(current_user: User = Depends(get_current_user)):
    """Check if current user is admin"""
    from ..utils.auth import is_admin_user
    return {"is_admin": is_admin_user(current_user)}
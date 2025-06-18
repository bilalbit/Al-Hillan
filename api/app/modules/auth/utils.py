# app/core/lifespan.py
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from api.app.core.config import get_settings

# Create a PasswordHasher instance with default Argon2 settings
ph = PasswordHasher(
    memory_cost=65536,  # 64MB memory (adjust based on server)
    time_cost=3,  # 3 iterations
    parallelism=4,  # 4 threads
    hash_len=32,  # 32-byte hash
    salt_len=16  # 16-byte random salt
)


# change 256hex value for every project and make sure to do not change it afterward thank u

# Function to hash a password
def hash_password(psk: str) -> str:
    """
    Hash a password using Argon2 with a project-specific salt.
    Appends settings.salt to the password before hashing to enhance security.
    Args:
        psk: Plaintext password to hash.
    Returns:
        str: Hashed password (includes Argon2-generated salt and parameters).
    Note:
        The fixed salt (settings.salt) is appended to the password, but Argon2
        generates a unique salt per hash, stored in the output.
    """
    # Append project-specific salt to password
    psk_with_salt = psk + get_settings().salt
    # Hash the salted password using Argon2
    hashed_password = ph.hash(psk_with_salt)
    return hashed_password


# Function to verify user password
def verify_password(hashed_password: str, psk: str) -> bool:
    """
    Verify a plaintext password against its hashed version using Argon2.
    Appends settings.salt to the plaintext password before verification.
    Args:
        hashed_password: Previously hashed password (from database).
        psk: Plaintext password to verify.
    Returns:
        bool: True if the password matches, False otherwise.
    """
    # Append project-specific salt to plaintext password
    psk_with_salt = psk + get_settings().salt
    try:
        # Verify the salted password against the hash
        return ph.verify(hashed_password, psk_with_salt)
    except VerifyMismatchError:
        return False

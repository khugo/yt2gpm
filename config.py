import os

EMAIL = os.environ.get("EMAIL", "")
PASSWORD = os.environ.get("PASSWORD", "")
OAUTH_CREDENTIAL_PATH = os.environ.get("OAUTH_CREDENTIAL_PATH", "./oauth.cred")
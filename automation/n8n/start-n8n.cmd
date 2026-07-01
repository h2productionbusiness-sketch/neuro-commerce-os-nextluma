@echo off
REM Start local n8n for the Neuro-Commerce OS (http://localhost:5678)
REM Requires n8n 1.x (stable). n8n 2.28.x has a broken @langchain/core dep — do not use.
set N8N_SECURE_COOKIE=false
set N8N_DIAGNOSTICS_ENABLED=false
n8n start

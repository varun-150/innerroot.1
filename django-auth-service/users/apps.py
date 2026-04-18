from django.apps import AppConfig
from django.db.backends.signals import connection_created
from django.dispatch import receiver
import json

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    def ready(self):
        @receiver(connection_created)
        def extend_sqlite(connection, **kwargs):
            if connection.vendor == 'sqlite':
                def json_valid(value):
                    try:
                        json.loads(value)
                        return 1
                    except (ValueError, TypeError):
                        return 0
                connection.connection.create_function("JSON_VALID", 1, json_valid)
                # Also add other missing JSON functions if needed
                def json_extract(value, path):
                    # Very basic mock
                    return json.loads(value)
                connection.connection.create_function("JSON_EXTRACT", 2, json_extract)


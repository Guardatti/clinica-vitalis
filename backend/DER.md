erDiagram
    %% --- ENTIDADES INDEPENDIENTES ---

    Users {
        int id PK
        string name
        string surname
        string email "unique"
        string password
        string rol "default: user"
    }

    SocialsWorks {
        int id PK
        string name "unique"
        string state "default: active"
        string address
        string phone
        string webpage
    }

    Professionals {
        int id PK
        string name
        string surname
        int dni "unique"
        date birthdate
        string gender
        string address
        string phone
        string email "unique"
        string speciality
        string state "default: active"
    }

    %% --- ENTIDADES DEPENDIENTES ---

    Patients {
        int id PK
        int socialWorkId FK
        string name
        string surname
        int dni "unique"
        date birthdate
        string gender
        string address
        string phone
        string email
        string state "default: active"
    }

    Shifts {
        int id PK
        int patientID FK
        int professionalID FK
        date date
        string description
        string state "default: pending"
    }

    %% --- RELACIONES ---

    %% Una Obra Social tiene muchos Pacientes
    SocialsWorks ||--|{ Patients : "tiene afiliados (1:N)"

    %% Un Profesional atiende muchos Turnos
    Professionals ||--o{ Shifts : "atiende (1:N)"

    %% Un Paciente solicita muchos Turnos
    Patients ||--o{ Shifts : "solicita (1:N)"

    %% NOTA: La tabla Users está aislada en este esquema
    %% (Probablemente solo para Login/Admin)
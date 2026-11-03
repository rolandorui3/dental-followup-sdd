# Feature Specification
## Treatment Rescue

### Problem

Patients undergoing multi-session dental treatments can stop
attending before their treatment is completed.

The clinic assistant needs a simple way to identify active
treatments that are at risk of abandonment so that patients
can be contacted proactively.

### Solution

Create a Treatment Rescue view.

The application automatically identifies active treatments
that meet all of the following conditions:

1. Treatment status is Active.
2. More than 15 days have passed since the last session.
3. There is no future appointment associated with the treatment.

Patients meeting these conditions appear in a prioritized
rescue list.

For every patient at risk, display:

- Patient name
- Treatment type
- Last session date
- Days since last session
- Risk status
- WhatsApp contact action

### Acceptance Criteria

#### AC1 - Detect abandonment risk

Given an Active treatment,
when more than 15 days have passed since the last session
and there is no future appointment,
then the patient must appear as "Riesgo de abandono".

#### AC2 - Future appointment

Given an Active treatment with a future appointment,
the patient must not appear in the rescue list.

#### AC3 - Completed treatment

Given a treatment with status Completed,
the patient must not appear in the rescue list.

#### AC4 - Contact action

Every patient appearing in the rescue list must have a
WhatsApp contact action.

#### AC5 - Risk information

Every row in the rescue list must display:
patient name, treatment type, last session date,
days since last session and risk status.

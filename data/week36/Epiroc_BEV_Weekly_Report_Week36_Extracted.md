# Epiroc BEV Weekly Report – Week 36
**Report Period:** 27 February 2026 – 05 March 2026
**Reported By:** Philip Moller
**Submitted To:** Sello Taku and Sipho

---

## 1. General Summary

The purpose of this report is to give an overview of all the Epiroc activities at Blackrock Mine Operations (BRMO).

---

## 2. BEV Critical Breakdown Summary

- I looked at the job cards on click view to see if I can get more info and do root cause analysis on the machines and look for re-occurring faults or trends. Unfortunately, it seems like job cards are not being filled in properly anymore. We are left with limited reporting to do this kind of RCAs.

---

## 3. BEV Daily Exceptions

### Friday 27 February 2026:
- **DT 150** - Morning shift: Mechanical breakdown – No feedback. (40min)
- **DT 172** – Morning shift: Electrical breakdown – HVIL fault – A812 door loose. Fixed door. (40min); Afternoon shift: Electrical fault – Replaced TMS HV cable. (2D20H50min)

### Saturday 28 February 2026:
- **FL 98** - Night shift: Auto electrical fault – Intermittent CAN fault (J1939). (2D22H22min)
- **DT 146** - Night shift: 3rd party supplier fault – STRATA. (1D37min)

### Sunday 01 March 2026:
- **DT 150** - Morning shift: Tyre Bay breakdown – No feedback. (21min); Morning shift: Electrical breakdown – No feedback. (1H15min); Morning shift: Electrical breakdown – Fixed loose connection on E-stop. (23H07min)
- **DT 162** – Morning shift: 3rd party supplier fault – Strata. (1H38min)
- **DT 163** – Morning shift: Fitter breakdown – Refilled hydraulic oil. (22H53min)

### Monday 02 March 2026:
- **FL 99** - Morning shift: Mechanical breakdown – Hydraulic oil. No feedback. (10min)
- **FL 107** - Morning shift: Petro man breakdown. (22min)
- **FL 108** - Morning shift: Auto electrical breakdown – No feedback. (51min); Morning shift: Auto electrical breakdown – No feedback. (7H48min)
- **FL 112** - Afternoon shift: Electrical breakdown – No feedback. (7H37min)
- **FL 113** - Morning shift: Auto electrical breakdown – No feedback. (1H57min); Afternoon shift: Auto electrical breakdown – No feedback. (1H30min)

### Tuesday 03 March 2026:
- **FL 98** - Afternoon shift: Electrical breakdown – Replaced 24V batteries and did fault finding on RCS Can cables. (1D21H27min)
- **FL 107** - Afternoon shift: Mechanical breakdown – No feedback. (4H29min)
- **FL 108** - Afternoon shift: Auto electrical breakdown – No feedback. (2H32min)
- **FL 113** - Afternoon shift: Electrical breakdown – HVIL fault on VPY83 x10.1 - Pin 1 and 2 not making good contact. (3H54min)
- **DT 147** – Afternoon shift: Tyre Bay breakdown – No feedback. (18H37min)

### Wednesday 04 March 2026:
- **FL 99** - Morning shift: Auto electrical breakdown – No feedback. (3H47min)
- **FL 107** - Morning shift: Mechanical breakdown – Replaced grease block and hose. (4H09min)
- **FL 113** - Night shift: Electrical breakdown – No feedback. (30min)
- **DT 146** - Night shift: Electrical breakdown – No feedback. (12H57min)
- **DT 149** – Morning shift: Auto electrical breakdown – Front traction motor overheats, Cleaned temp sensor. (19H49min)

### Thursday 05 March 2026:
- **FL 108** - Morning shift: Mechanical breakdown – No feedback. (31min)
- **FL 112** - Morning shift: Electrical breakdown – No feedback. (17min); Night shift: Mechanical breakdown – Hydraulic oil leak: Busy replacing hose from tank to cooler. (Ongoing)
- **DT 162** - Night shift: 3rd party supplier fault – Strata. (57min); Night shift: 3rd party supplier fault – Strata. (45min)
- **DT 163** - Night shift: Mechanical breakdown – No feedback. (12H48min)

---

## 4. Planned Work for Coming Week

**NCH3:**
- Chargers monthly services
- Battery monthly services
- A-frame audits to be completed
- FL103 breakdown: Park brake solenoid not getting power

**NCH2:**
- Commission RT0061 (New close cab machine)

**Gloria:**
- Audit of RT0045 and RT0046. Machines have low availability.

---

## 5. Improvement and Actions

1. We need to look at the data of the charger interrupts. This function was tasked with Desmond. We will start seeing data coming through this week.
2. Post 3, 6 and 7 cables replaced. Piet ordered the rest of the cables.
3. Auxiliary motor spline grease TSNB not done. Only DT147 completed. We need to schedule the machines to complete this campaign. Grease already on site.
4. Regeneration knob set to 100% completed. Need to sign off change management and attendance register for operators and artisans underground.
5. Need to physically check status of chargers and compare to report. Chargers checked. All modules put back except for charger 2 with a faulty module.
6. VCA, VCB cables and discharge resistors identified machines to be replaced. Parts ordered. - Wimpie and Piet, can you please update me on what machines resistors and connectors was replaced.
7. Audits to be done on all A frame retaining bolts of dump trucks. Could not do this. Currently busy with Brake wear measurements on BEV machines.
8. Flashing beacon to be trailed on the batteries to show operators when battery temp reaches a pre-set temp.
9. Busy with TMS hyper care on all batteries.

---

## 6. Passport 360 Compliance

- BEV Technicians: **94%**
- CASL9 (Gloria): **95%**
- CASL9 (Nch2): **93%**
- CAS L9 (Nch3): **93%**
- Certiq & Mobilaris N2: **87%**
- Certiq & Mobilaris Gloria: **87%**

---

## 7. Battery and Charger Status Report

### General Summary

**ST14 – B4 battery packs**
- We currently have 10 x ST14 – B4 battery packs and 6 x ST14 machines operational underground. This is equal to the committed ratio of 1.6 batteries per machine.

**MT42 – B5 battery packs**
- We currently have 12 x MT42 – B5 battery packs operational underground. This is above the committed ratio of 1.6 batteries per machine.

**160 kW Chargers**
- DCDC campaign 95% complete. Initial indication from team is that charger stops significantly reduced.
- TSNB software V6.3 to be installed on batteries. (level 3 safe state)
- Fleet number stickers ordered and installed on batteries.

### Table 1: Battery Pack Availability

| Battery Type | Battery ID | Status | Comment |
|---|---|---|---|
| B4 - ST14 | VPY-00011 | Working | 27/03/2026 - Battery temps running too high. Cleaned condenser. (1H) |
| B4 - ST14 | VPY-00031 | Working | 04/03/2026 - Re pressurized cooling system (1,5H); 05/03/2026 - Replaced cooling hose on TMS and re-pressurize system. (2Hrs) |
| B4 - ST14 | VPY-00051 | Working | 04/03/2026 - Re-pressurized cooling system. There was air in the system. (3H) |
| B4 - ST14 | VPY-00034 | Working | 03/03/2026 - Put VPY-00051 TMS on battery. Replaced cooling pump and repaired pump harness. (4D) |
| B4 - ST14 | VPY-00048 | Working | 04/03/2026 - Coolant hose clamp loose, tightened clamp and re pressurized system. (1,5H) |
| B4 - ST14 | VPY-00049 | Working | |
| B4 - ST14 | VPY-00088 | Working | |
| B4 - ST14 | VPY-00086 | Working | |
| B4 - ST14 | VPY-00076 | Working | |
| B4 - ST14 | VPY-00083 | Working | |
| B4 - ST14 | VPY-00041 | Working | |
| B5 - MT42 | VPX-00016 | Working | |
| B5 - MT42 | VPX-00015 | Working | |
| B5 - MT42 | VPX-00023 | Working | |
| B5 - MT42 | VPX-00017 | Working | |
| B5 - MT42 | VPX-00010 | Breakdown | 05/03/2026 - Monthly service was done. When doing a self-test, Pat saw TMS not working. Busy with fault finding. |
| B5 - MT42 | VPX-00050 | Working | |
| B5 - MT42 | VPX-00031 | Working | |
| B5 - MT42 | VPX-00036 | Working | |
| B5 - MT42 | VPX-00028 | Working | |
| B5 - MT42 | VPX-00026 | Working | |
| B5 - MT42 | VPX-00024 | On DT-171 | Battery out of production. On DT-171 (breakdown MT42) |
| B5 - MT42 | VPX-00048 | Working | |
| B5 - MT42 | VPX-00044 | Working | |

---

## 8. Battery Charger Summary

**Charger 1:** Module 2 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

**Charger 2:** Module 2 switch off and pulled out. All fans working on the 3 modules in use. **Module 2 faulty.**

**Charger 3:** Module 4 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

**Charger 4:** Module 1 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

**Charger 5:** Module 4 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

**Charger 6:** Module 1 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

**Charger 7:** Module 4 switch off but still in place. All fans working on the 3 modules in use. **Switched on.**

**Charger 8:** Module 4 switch off and pulled out. All fans working on the 3 modules in use. Trip over current in mini sub if switched on.

---

## 9. Battery Overheat Report

- VPY-00011 started to show signs of overheating. Condenser was cleaned and the battery was cooling down fine.
- VPY-00051 was overheating. The cooling pump failed. The TMS was swapped with VPY-00076 (The battery that will be replaced by VPY-00034).
- VPY-00088 Cooling pump fuse trip. Repaired loose connection on pump connector.

---

## 10. Critical Issues Summary

### BEV - Critical Issues Summary
- Job cards are not being filled in properly on Click View, limiting root cause analysis capability for re-occurring faults and trends.

### CAS L9 Implementation - Critical Issues Summary
- Lab scale tests with new software currently underway.
- Invoicing and sign off to be completed.
- MH4.0 software to be loaded on the BEV machines. Currently busy with the lab scale tests and approval of the software.

### Certiq & Mobilaris - Critical Issues Summary
- No items reported this week.

---

## 11. CAS Report Summary

- **Report Type:** Weekly
- **Project Leader:** Hennie van Niekerk
- **Contract No:** BPE145D
- **Progress Update:** Need new contract for support.

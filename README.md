# Pawn Management App

## Description

The Pawnshop Application is a simple web application designed to manage customer information, types of goods, interest rates, and pawn contracts. The purpose of the application is to assist individuals, including administrators, managers, and transaction staff, in tracking and managing operations effectively and consistently.

## Link Deploy

Netlify: https://pawn-management.netlify.app/

GitHub FE: https://github.com/nhuttuan239/Final-Pawn-FE.git

GitHub BE: https://github.com/nhuttuan239/Final-Pawn-BE.git

## Account Test

Admin account (Manager UserPage):

- Username: admin1
- Password: 123

Manager account:

- Username: manager2
- Password: 123

Employee account:

- Username: employee2
- Password: 123

## Quick information

- Each user has specific role
  - Role system: Employee < Manager - Admin
    -> limit access to certain features
- Each employee must have 1 manager to be reported to.
- Manager report to Admin

- Specific features:

  - Create/Update/Delete employee and manager (Admin)
  - Create/Update/Delete Type Product (only Manager)
  - Create/Update/Delete Interest Rate (only Manager)
  - Create/Update/Delete Customer (only Manager)
  - Create Contract (All manager and employee)
  - Update/Delete Contract (Manager update/delete contract create by themselves or by employees reportTo )
  - Get Payment contract (Manager and employee get billing information for contracts they manage)

- Calculation for Payment contract:

  - TotalDays = payDate - createDate
  - Interest rate is calculated based on interest rate frame and totalDays
  - Interest Pay = Price \* Interest rate.

## User Stories & Features

### Authentication

[x] All users can sign in with authorized accounts

[x] New employee and manager created by Admin

### Home Page

[x] Employee can only see ContractPage.

[x] Manager can see 2 ContractPage, CustomerPage,InterestPage

[x] Admin can only see UserPage

### User Management

[x] Admin can see list of all user

[x] Admin can add new user

[x] Admin can update/ delete user

### Interest Management

[x] Manager can see list of all interest rate

[x] Manager can add new interest rate

[x] Manager can update/ delete interest rate

### TypeProduct Management

[x] Manager can see list of all typeproduct

[x] Manager can add new typeproduct

[x] Manager can update/ delete typeproduct

### Contract Management

(Role: Managers can access contracts created by them and the employees they manage. Employees can only create/view contracts they create and cannot update/delete them)

[x] User can see list of all contract

[x] User can add new contract

[x] Only manager can update/ delete contract

### Get Payment

[x] Manager/Employee can get payment for contracts they create

[x] Manager/Employee can create/delete bill for payment they see.

## Setup

### Installation

1. Clone the repository

```
git clone <repository_url>
```

2. Navigate to the project directory:

```
cd <folder_name>
```

3. Install dependencies:

```
npm install
```

### Configuration

Create a .env file to setup enviroment variables

```
REACT_APP_BACKEND_API = ""


```

Update your firebase config in firebase-messaging-sw.js file

### Usage

```
npm start
```

## Third-party Libraries

- ReactJS

- Redux

- Material UI

- Material React Table (v2)

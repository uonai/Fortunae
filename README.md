# Fortunæ

Fortunæ is an offline-first personal finance tool designed to quickly create and manage financial records. Categories include accounts, expenses, debt, income, wants, and needs. It supports SVG charting with an array of charts from the D3.js library.

Fortunæ manages data locally in JSON files in human-readable format and allows historical browsing of records within the application.

Compiled application can be found at https://uonai.itch.io/fortunae

A video tutorial is available here https://www.youtube.com/watch?v=F_DSCm1LjIw

## Install & Run

To install Fortunæ on Windows and Linux ([NixOS users see here](https://github.com/uonai/Fortunae/issues/1)):

```
git clone https://github.com/uonai/Fortunae
cd Fortunae
npm install
npm start
```

## Localization

Fortunae is available in English, Spanish and German. To toggle language, navigate to the settings using ctrl + 6.

## Theming

Fortunae can be themed. To update colors, navigate to the settings using ctrl + 6.

## Windows Hotkeys

- Funds: ctrl + 1
- Expenses: ctrl + 2
- Debts: ctrl + 3
- Income: ctrl + 4

- Funds Chart: ctrl + j
- Expenses Chart: ctrl + k
- Debts Chart: ctrl + l
- Incomes Chart + ctrl + ;

- Close all Charts: ctrl + q

- Save: ctrl + s
- Escape from Modal: esc

- Change settings: ctrl + 6

## Algorithm:

Recommendations algorithm sums all sources of income for the time period specified.

If combined total of Savings and Emergency Fund is greater than or equal to 3x the Income on your record, you're given a recommendation of Spending 60%, Saving 30%, and Investing 10%.

If combined total of Savings and Emergency Fund is less than or equal to 3x the Income on your record, you're given a recommendation to Spend 60%, and add 40% to an Emergency Fund. For tracking purposes, these funds can be added to a Savings Fund or an Emergency Fund.

### Overview of Terminology

#### General Setup

You should decide between whether you are tracking your finances weekly or monthly and adhere to this. Each record will represent that time frame and it will make record keeping dependable.

#### Funds

Each item that is added to funds should represent an account that is used for spending. There are four categories of accounts: Checking, Saving, Investment, Emergency. For tracking purposes each category of account rolls up to a grand total. If you have two savings accounts, you will see a grand total in the charts.

#### Expenses

Each item that is added as an expense should get a category of expense. All expense categories roll up to grand totals in their respective categories. If you have three items that you categorize as a "Food" expense, the grand total will display the sum of these expenses.

#### Debts

Each item that is added as a debt should get a debt category. There are four general categories of debts: Secured, Unsecured, Revolving, Non-Revolving.

##### Secured (Investopedia df.):

Secured debt is debt backed or secured by collateral to reduce the risk associated with lending, such as a mortgage. If the borrower defaults on repayment, the bank seizes the house, sells it and uses the proceeds to pay back the debt. Assets backing debt or a debt instrument are considered security, which is why unsecured debt is considered a riskier investment than secured debt.

The most commonly cited example of a secured loan is a mortgage. Other examples include the service provided by pawnshops or the factoring of receivables.

##### Unsecured (Investopedia df.):

Unsecured debt refers to loans that are not backed by collateral. If the borrower defaults on the loan, the lender may not be able to recover their investment because the borrower is not required to pledge any specific assets as security for the loan.

Examples of unsecured debt include credit cards, medical bills, utility bills, and other instances in which credit was given without any collateral requirement.

##### Revolving (Investopedia df.):

Revolving credit refers to a situation where credit replenishes up to the agreed upon threshold, known as the credit limit, as the customer pays off debt. It offers the customer access to money from a financial institution and allows the customer to use the funds when needed. It usually is used for operating purposes and the amount drawn can fluctuate each month depending on the customer's current cash flow needs.

Revolving credit may take the form of credit cards or lines of credit. Revolving lines of credit can be taken out by corporations or individuals. It may be offered as a facility.

##### Non-Revolving (Investopedia df.):

Non-revolving loans are often an option for borrowers seeking to make large purchases or consolidate their debt. They can be used for buying a car or buying a home for example. In these situations, the loan is also secured with collateral which is an added benefit for a non-revolving loan.

In a non-revolving loan, the borrower receives a maximum principal amount in a lump sum upfront when the borrower is approved for the loan. These loans have a specified duration which will vary by the type of credit product. Non-revolving loans also typically require monthly installment payments and will generally have interest rates in a similar range to revolving credit.

#### Incomes

Each item that is added as an income should reflect the income for that period of time. If you are tracking weekly finances and add a salary, it will be the salary for the week (after taxes). If you hare tracking monthly finances and add a salary, it will be the salary for the month (after taxes).
Types of income include Active, Passive, and Portfolio.

###### Active (Investopedia df.)

Active income refers to income received from performing a service and includes wages, tips, salaries, commissions, and income from businesses in which there is material participation. An accountant who works for a monthly paycheck, for example, receives active income.

###### Passive (Investopedia df.)

Passive income is earnings derived from a rental property, limited partnership, or other enterprise in which a person is not actively involved. As with active income, passive income is usually taxable. However, it is often treated differently by the Internal Revenue Service (IRS). Portfolio income is considered passive income by some analysts, so dividends and interest would therefore be considered passive. However, the IRS does not always agree that portfolio income is passive, so it’s wise to check with a tax professional on that subject.

##### Portfolio (Investopedia df.)

Portfolio income is money received from investments, dividends, interest, and capital gains. Royalties received from investment property also are considered portfolio income sources.

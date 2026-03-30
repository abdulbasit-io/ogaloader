# Ogaloader Operations Plan

## 1. Introduction
This document outlines the day-to-day operational framework required to run Ogaloader successfully. It covers user onboarding, the end-to-end fulfillment process, financial workflows, risk management, and the organizational structure needed to scale our dual freight and commodity marketplace.

## 2. Supply Side: Onboarding & Vetting
To build trust and ensure high reliability, Ogaloader will implement a rigorous, digital-first verification system.

### 2.1 Truck Drivers & Fleet Owners
*   **Driver Verification:** Mandatory biometric verification (e.g., BVN/NIN in Nigeria), valid driver's license (appropriate class for heavy goods), and background checks.
*   **Asset Verification:** Collection of vehicle registration, proof of ownership, valid roadworthiness certificates, and mandatory comprehensive or third-party vehicle insurance.
*   **Physical Spot Checks:** Periodic visual inspections of trucks at partner union parks to ensure they meet platform standards.

### 2.2 Market Sellers
*   **Business Verification:** Valid business registration documents (e.g., CAC) and utility bills for physical location verification.
*   **Quality Assurance:** For bulk commodities (sand, cement, grain), initial physical audits of the seller's yard or warehouse by the Ogaloader local ops team.
*   **Account Activation:** Once verified, sellers are granted access to a "Seller Dashboard" to upload inventory and manage dynamic pricing.

## 3. End-to-End Fulfillment Workflow (The "Happy Path")
The operations system must facilitate a seamless transition from order placement to final delivery.

1.  **Order Placement & Escrow:** A buyer orders 500 bags of cement via the marketplace. The total sum (product + calculated freight cost) is charged and held securely in Ogaloader's escrow wallet.
2.  **Algorithmic Dispatch:** The system broadcasts a "Load Request" to vetted trucks within a predefined radius of the pickup location that match the cargo's weight requirements.
3.  **Acceptance & Routing:** A driver accepts the trip. The app provides optimized routing to the designated seller's location.
4.  **Proof of Pickup (POP):** The driver arrives, inspects the cargo, and the seller generates a digitally signed Electronic Waybill on the app.
5.  **Transit Monitoring:** The customer and the Ogaloader Command Center monitor the truck via live GPS. Geofencing alerts trigger if the truck deviates significantly from the route or stops unexpectedly.
6.  **Proof of Delivery (POD):** The driver arrives at the destination. The buyer inspects the goods and signs off on the mobile app. A digital POD is generated.
7.  **Automated Payout:** The escrowed funds are instantly split; the seller receives their product cost (minus marketplace commission), and the driver receives the freight fee (minus logistics commission).

## 4. Platform Operations & Command Center
*   **24/7 Dispatch Control:** A centralized monitoring team overseeing all active trips, anticipating delays (e.g., traffic, border issues), and acting as an intermediary when exceptions occur.
*   **Exception Management & Disputes:** Protocols for dealing with breakdowns, accidents, cargo damage, and buyer/seller disputes. Drivers are required to use an SOS feature on the app for immediate roadside or security assistance.
*   **Customer Success:** A dedicated team providing technical support for the app, managing seller inventory issues, and handling general inquiries.

## 5. Financial Operations
*   **Wallet Management:** Integration with gateways like Paystack or Flutterwave for seamless wallet top-ups.
*   **Vendor Payout Cycles:** Automated T+1 (next day) or instant settlement upon successful POD to ensure liquidity for sellers and drivers, building platform loyalty.
*   **Reconciliation:** Daily automated reconciliation of escrow balances to prevent discrepancies.

## 6. Risk, Compliance, and Security
*   **Goods-In-Transit (GIT) Insurance:** Strategic partnerships with tier-1 insurance providers to offer embedded, automated GIT insurance coverage at checkout to protect against cargo loss, theft, or damage.
*   **Fraud Prevention:** Anti-spoofing measures in the GPS system to prevent fake trips, and strict multi-factor authentication for payouts.
*   **Data Privacy:** Strict adherence to regional data protection regulations (e.g., NDPR in Nigeria) regarding the handling of customer and driver data.

## 7. Key Operational Metrics (KPIs)
To measure operational efficiency, the team will monitor the following daily:
*   **Fulfillment Rate:** Percentage of marketplace orders successfully matched with a truck within 30 minutes.
*   **On-Time Delivery (OTD):** Percentage of shipments that arrive at or before the estimated time of arrival.
*   **Empty Mile Reduction:** The percentage decrease in unladen return trips for our active fleet partners.
*   **Dispute Resolution Time:** Average time taken to resolve an in-transit or delivery dispute.
*   **Platform Uptime:** Commitment to a 99.9% technical uptime standard to avoid supply chain disruptions.

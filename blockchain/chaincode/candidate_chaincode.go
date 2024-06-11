package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// CandidateContract defines the Smart Contract structure
type CandidateContract struct {
    contractapi.Contract
}

// Candidate represents a candidate in an election
type Candidate struct {
    ID            string `json:"id"`
    ElectionName  string `json:"electionName"`
    CandidateName string `json:"candidateName"`
    Votes         int    `json:"votes"`
}
var candidateIDCounter = 0

func generateCandidateID(electionName, candidateName string) string {
    candidateIDCounter++
    return fmt.Sprintf("%s-%s-%d", electionName, candidateName, candidateIDCounter)
}
// InitLedger initializes the chaincode state with a few sample candidates
func (c *CandidateContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
    candidates := []Candidate{
        {ID: "2024 Election-John Doe-000",ElectionName: "2024 Election", CandidateName: "John Doe", Votes: 0},
        {ID: "2024 Election-Jane Smith-010",ElectionName: "2024 Election", CandidateName: "Jane Smith", Votes: 0},
    }

    for _, candidate := range candidates {
        candidateJSON, err := json.Marshal(candidate)
        if err != nil {
            return err
        }
        err = ctx.GetStub().PutState(candidate.CandidateName, candidateJSON)
        if err != nil {
            return fmt.Errorf("failed to put to world state. %v", err)
        }
    }
    return nil
}

// QueryCandidateVotes retrieves the vote count for a specific candidate
func (c *CandidateContract) QueryCandidateVotes(ctx contractapi.TransactionContextInterface, candidateID string) (*Candidate, error) {
    candidateJSON, err := ctx.GetStub().GetState(candidateID)
    if err != nil {
        return nil, fmt.Errorf("failed to read from world state: %v", err)
    }
    if candidateJSON == nil {
        return nil, fmt.Errorf("candidate not found")
    }

    var candidate Candidate
    err = json.Unmarshal(candidateJSON, &candidate)
    if err != nil {
        return nil, err
    }

    return &candidate, nil
}

// GetAllCandidates returns all candidates and their vote counts
func (c *CandidateContract) GetAllCandidates(ctx contractapi.TransactionContextInterface) ([]*Candidate, error) {
    queryIterator, err := ctx.GetStub().GetStateByRange("", "")
    if err != nil {
        return nil, fmt.Errorf("failed to read from world state: %v", err)
    }
    defer queryIterator.Close()

    var candidates []*Candidate
    for queryIterator.HasNext() {
        queryResult, err := queryIterator.Next()
        if err != nil {
            return nil, err
        }

        var candidate Candidate
        err = json.Unmarshal(queryResult.Value, &candidate)
        if err != nil {
            return nil, err
        }

        candidates = append(candidates, &candidate)
    }

    return candidates, nil
}

// AddCandidate adds a new candidate to the ledger
func (c *CandidateContract) AddCandidate(ctx contractapi.TransactionContextInterface, electionName string, candidateName string, Votes int) error {
    candidateID := generateCandidateID(electionName, candidateName)
    candidate := Candidate{
        ID:            candidateID,
        ElectionName:  electionName,
        CandidateName: candidateName,
        Votes:         Votes, 
    }

    candidateJSON, err := json.Marshal(candidate)
    if err != nil {
        return err
    }

    // Save candidate details to the ledger
    err = ctx.GetStub().PutState(candidateID, candidateJSON)
    if err != nil {
        return fmt.Errorf("failed to put candidate state: %v", err)
    }

    return nil
}

//update to update ledger by can_id
func (c *CandidateContract) UpdateCandidate(ctx contractapi.TransactionContextInterface, candidateID string,electionName string, candidateName string, Votes int) error{
        candidate :=Candidate{
            ID:             candidateID,
            ElectionName:   electionName,
            CandidateName:  candidateName,
            Votes:          Votes,
        }
        candidateJSON, err:=json.Marshal(candidate)
        if err!=nil{
            return err
        }
        err = ctx.GetStub().PutState(candidateID, candidateJSON)
        if err != nil {
            return fmt.Errorf("failed to put candidate state: %v", err)
        }
    
        return nil

}



// DeleteCandidate deletes a candidate from the ledger
func (c *CandidateContract) DeleteCandidate(ctx contractapi.TransactionContextInterface, candidateID string) error {
    // Check if candidate exists
    candidateJSON, err := ctx.GetStub().GetState(candidateID)
    if err != nil {
        return fmt.Errorf("failed to read from world state: %v", err)
    }
    if candidateJSON == nil {
        return fmt.Errorf("candidate '%s' not found", candidateID)
    }

    // Delete the candidate from the ledger
    err = ctx.GetStub().DelState(candidateID)
    if err != nil {
        return fmt.Errorf("failed to delete candidate '%s': %v", candidateID, err)
    }

    return nil
}

// main function starts up the chaincode in the container during instantiate
func main() {
    cc, err := contractapi.NewChaincode(&CandidateContract{})
    if err != nil {
        fmt.Printf("Error creating candidate chaincode: %v", err)
        return
    }

    if err := cc.Start(); err != nil {
        fmt.Printf("Error starting candidate chaincode: %v", err)
    }
}

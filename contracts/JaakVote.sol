pragma solidity ^ 0.4 .24;

/** 
* Written by Meer Ali https://github.com/AliMeer
* 
@title JaakVote: Jaak coding challenge 
*/

contract JaakVote {
    /** @dev Keep count of valid 'yes' or 'no' votes.
     * @param constructor does not take any input parameters.
     * @numberOfVotes keeps count of total votes
     * @totalNoVotes keeps count of total 'no' votes
     * @totalYesVotes keeps count of total 'yes' votes
     * @manager stores the address of contract creator
     * this is used to restrict some fucntions from being
     * executed only by the manager
     * 
     * @votingRecord stores voting record for all voters
     * this is used to ensure votes are recorded correctly
     * the voter can access and confirm that their vote has
     * recorded correctly.
     * 
     * @noHash a variable for store hash of string "no"
     * @yesHash a variable for store hash of string "yes"
     * 
     */

    mapping(address => string) private votingRecord;
    uint32 public totalVotes;
    uint32 public totalNoVotes;
    uint32 public totalYesVotes;
    address private manager;
    bytes32 private noHash;
    bytes32 private yesHash;

    constructor() public {
        manager = msg.sender;
        totalVotes = 0;
        totalYesVotes = 0;
        totalNoVotes = 0;
        noHash = keccak256("no");
        yesHash = keccak256("yes");
    }

    /** castVote function for voter to cast yes or no vote */
    function castVote(string vote) public {
        /**
         *@dev this function will check if the vote parameter string
         * is a valid 'yes' or 'no' string, if its not the vote wont
         * be entered and recoreded and false will be returned
         * 
         * if its  valid vote its recorded as a yes or no
         * the total no or yes vote is also incremented
         * 
         */
        //convert the vote string to a lower case to
        //ensure camel case, upper case or any combination
        //is converted to a uniform lowercase form for cmparision

        bytes32 lowerVoteHash = keccak256(toLower(vote));
        
            if (isValidVoter(msg.sender) && isValidVote(lowerVoteHash)) {
                //check if vote is yes
                //increment the totalVoteCount
                totalVotes++;
                if (lowerVoteHash == yesHash) {
                    //its a yes vote, add to yes vote count
                    totalYesVotes++;
                    //add a entry to record how the voter voted
                    votingRecord[msg.sender] = "yes";
                    
                } else {
                    //its a no vote
                    //increment count for no vote
                    totalNoVotes++;
                    //add a entry to record how the voter voted
                    votingRecord[msg.sender] = "no";
                    //return true as the vote has been succesfully entered
                    
                }
            }
            
        
        
    }


    /** 
    voteCount returns the total vote count for yes or no votes
    */
    function voteCount(string vote) public view returns(int64) {
        /**
         * @vote the vote for which the total vote count should be returned
         * returns the total yes or no votes cast so far
         * returns -1 if the vote parameter is not 'yes' or 'no'
         */
        bytes32 lowerVoteHash = keccak256(toLower(vote));
        if (isValidVote(lowerVoteHash)) {

            //check if vote parameter passed is yes
            if (lowerVoteHash == yesHash) {
                //return total yes votes so far
                return totalYesVotes;
            } else {
                //its a no vote
                //return total no votes so far
                return totalNoVotes;
            }
        }
        //return false as the vote parameter is not yes or no
        else return -1;
    }


    /** 
       checkVote returns the vote that was recoreded for an address
       */
    function checkVote(address voter) public view returns(string) {
        /**
         * @voter the public address of the voter
         * returns the vote that was recorded for the voter
         * returns 0 if no vote record is found
         */
        return votingRecord[voter];
    }

    /** 
    checkVote returns how the function caller voted
    */
    function checkVote() public view returns(string) {
        /**
         * returns the vote that was
         * returns 0 if no vote record is found
         */
        return votingRecord[msg.sender];
    }


    /** isValidVote This function checks if the vote
    cast is a valid yes or no vote*/

    function isValidVote(bytes32 lowerVoteHash) private view returns(bool) {
        /**
         * @dev this functions compare the hash of the entered vote
         * it compares the vote has with 
         * the hash of he actual 'yes' or 'no' string
         */
        //check if the vote entry is a valid yes or no string
        //if its anything else then return false
        return (
            lowerVoteHash == noHash ||
            lowerVoteHash == yesHash
        );
    }

    /** this function checks if the voter has already voted*/
    function isValidVoter(address voter) private returns(bool) {
        /**
         * 
         */
        //check votingRecord mapping to see if the public address has already voted

        if (isValidVote(keccak256(votingRecord[voter]))) {
            return false;
        } else {
            return true;
        }
    }

    function toLower(string str) private view returns(string) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint i = 0; i < bStr.length; i++) {
            // Uppercase character...
            if ((bStr[i] >= 65) && (bStr[i] <= 90)) {
                // So we add 32 to make it lowercase
                bLower[i] = bytes1(int(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }


}
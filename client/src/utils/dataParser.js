export const percentageParser=(str)=>{
        console.log(str)
        return   Number(str?.substring(0, str?.length - 4));
   
}
export const mbParser =(str)=>{
    return   Number(str?.substring(0, str?.length - 5));
}


export const  formatDuration=(seconds)=> {
    if(seconds){
        seconds=Number(seconds?.substring(0, seconds?.length - 12));
    console.log(seconds)
    
    if (seconds < 0 || !Number.isInteger(seconds)) {
      throw new Error('Input must be a non-negative integer.');
    }
  
    // Calculate days, hours, and minutes
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
  
    // Return formatted string
    return `${days}d ${hours}h ${minutes}m`;
    }
    
  }
  
  // Example usage
 
  
function PromptPhase({prompt, setPrompt}){
    return(
        <>
        {/* Gonna add a round theme or something later */}
        <form>
            <p>Enter something funny</p>
            <input 
            type="text" 
            placeholder="Enter your thingy"
            value={prompt}
            onChange={setPrompt}
            />
        </form>
        </>
    )
}

export default PromptPhase
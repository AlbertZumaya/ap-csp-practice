controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isDashing)) {
        isDashing = true
        // Increase player's speed during dash
        playerSpeed = dashSpeed
        // Adjust the duration of the dash (in milliseconds)
        pause(200)
        // Reset player speed after dash
        playerSpeed = 100
        isDashing = false
    }
})
let isDashing = false
let dashSpeed = 0
let playerSpeed = 0
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 3 3 3 3 . . . . . . . 
    . . . . . 3 . 3 3 3 3 . . . . . 
    . . . . . 3 3 3 3 . . 3 . . . . 
    . . . . . 3 3 3 . 3 . . 3 3 . . 
    . . . . . 3 3 3 3 3 3 3 3 . . . 
    . . . . . . . 3 3 . . . . . . . 
    . . . . . . . 3 3 . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
playerSpeed = 100
dashSpeed = 200
tiles.setCurrentTilemap(tilemap`level3`)
game.onUpdate(function () {
    if (!(isDashing)) {
        // Move player normally if not dashing
        controller.moveSprite(mySprite, playerSpeed, 0)
    } else {
        // Move player faster if dashing
        controller.moveSprite(mySprite, playerSpeed * 2, 0)
    }
    // Check for collision with walls
    if (mySprite.tileKindAt(TileDirection.Center, sprites.castle.tilePath5)) {
        if (isDashing) {
            // Player dashes through the wall, no sticking
            // Reset x position to avoid sticking
            mySprite.x = mySprite.x
            // Reset y position to avoid sticking
            mySprite.y = mySprite.y
        } else {
            // Player sticks to the wall
            // Stop horizontal movement
            mySprite.vx = 0
            // Stop vertical movement
            mySprite.vy = 0
        }
    }
})

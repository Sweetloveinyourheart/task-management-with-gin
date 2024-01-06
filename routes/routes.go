// routes/routes.go

package routes

import (
	"task-management-with-gin/controllers"
	"task-management-with-gin/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter configures and returns the main router
func SetupRouter() *gin.Engine {
	routes := gin.Default()

	// CORS middleware
	routes.Use(cors.Default())

	// Create controllers instances
	userController := controllers.NewUserController()

	// Define your routes here
	routes.GET("/user/profile", middlewares.AuthGuard, userController.GetUserProfile)
	routes.GET("/user/refresh-token", userController.RefreshToken)
	routes.POST("/user/register", userController.Register)
	routes.POST("/user/sign-in", userController.SignIn)
	routes.PUT("/user/profile", middlewares.AuthGuard, userController.UpdateUserProfile)

	return routes
}

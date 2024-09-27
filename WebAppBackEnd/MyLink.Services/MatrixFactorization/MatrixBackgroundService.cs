using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace MyLink.Services.MatrixFactorization
{
    public class MatrixBackgroundService: BackgroundService
    {
        private readonly ILogger<MatrixBackgroundService> _logger;
        private readonly IServiceProvider _services;
        private Timer _timer;
        
        public MatrixBackgroundService(IServiceProvider services, 
            ILogger<MatrixBackgroundService> logger)
        {
            _services = services;
            _logger = logger;
        }
        
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation(
                "Consume Scoped Service Hosted Service running.");
            Console.WriteLine("ekaaa\n\n");
            // Run the Matrix Factorization Algorithm
            
            var interval = TimeSpan.FromMinutes(5).TotalMilliseconds;
            
            _timer = new Timer(StartTheMatrixFactorizationAsync, null, TimeSpan.Zero, TimeSpan.FromMilliseconds(interval));
            await Task.Delay(Timeout.Infinite, stoppingToken);
        }
        
        private async void StartTheMatrixFactorizationAsync(object state = null)
        {
            _logger.LogInformation(
                "Consume Scoped Service Hosted Service is working.");

            using (var scope = _services.CreateScope())
            {
                // var matrixFactorizationService = scope.ServiceProvider.GetRequiredService<MatrixFactorizationAlgorithm>();
                // matrixFactorizationService.CalculateForJobs();
                // matrixFactorizationService.CalculateForPosts();
                // _logger.LogInformation("Running matrix factorization");
            }
        }
        // Stop ASYNC
        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation(
                "Consume Scoped Service Hosted Service is stopping.");
            _timer?.Change(Timeout.Infinite, 0);
            await base.StopAsync(stoppingToken);
        }
    }
}
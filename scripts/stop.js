const { execSync } = require('child_process');

const ports = [3000, 3001]; // Add all ports your app might use

try {
  if (process.platform === 'win32') {
    // Windows
    ports.forEach(port => {
      try {
        const command = `netstat -ano | findstr :${port}`;
        const output = execSync(command).toString();
        const matches = output.match(/\s+(\d+)$/gm);
        if (matches) {
          matches.forEach(match => {
            const pid = match.trim();
            if (pid !== '0') {
              try {
                execSync(`taskkill /F /PID ${pid}`);
                console.log(`Process on port ${port} (PID: ${pid}) stopped.`);
              } catch (error) {
                console.log(`Failed to stop process on port ${port} (PID: ${pid}): ${error.message}`);
              }
            } else {
              console.log(`Cannot stop system process on port ${port}.`);
            }
          });
        } else {
          console.log(`No process running on port ${port}.`);
        }
      } catch (error) {
        console.log(`Error checking process on port ${port}: ${error.message}`);
      }
    });
  } else {
    // Unix-based systems (Mac, Linux)
    ports.forEach(port => {
      try {
        const command = `lsof -ti :${port}`;
        const pids = execSync(command).toString().trim().split('\n');
        if (pids.length > 0 && pids[0] !== '') {
          pids.forEach(pid => {
            try {
              execSync(`kill -9 ${pid}`);
              console.log(`Process on port ${port} (PID: ${pid}) stopped.`);
            } catch (error) {
              console.log(`Failed to stop process on port ${port} (PID: ${pid}): ${error.message}`);
            }
          });
        } else {
          console.log(`No process running on port ${port}.`);
        }
      } catch (error) {
        console.log(`Error checking process on port ${port}: ${error.message}`);
      }
    });
  }

  console.log('Stop script completed.');
} catch (error) {
  console.error('Failed to stop processes:', error.message);
}
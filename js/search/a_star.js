import Search from './search';
import { PriorityQueue } from '../data_structures';

class AStar extends Search {
  initializeFrontier() {
    this.frontier = new PriorityQueue();
    super.initializeFrontier();
  }

  reset() {
    super.reset();
    this.costSoFar = {};
    this.costSoFar[this.board.start] = 0;
  }

  processNeighbors(current) {
    this.board.neighbors(current).forEach(
      function(neighbor) {
        const type = this.board.grid[neighbor].type;
        const cost = type === 'obstacle' ? 20000 : 6;
        const newCost = this.costSoFar[current] + cost;

        if (!(neighbor in this.costSoFar) ||
            newCost < this.costSoFar[neighbor]) {
              const priority = newCost + this.euclidean(neighbor, this.board.goal);

              this.frontier.insert(neighbor, priority);
              this.cameFrom[neighbor] = current;
              this.costSoFar[neighbor] = newCost;
              this.board.grid[neighbor].setType('frontier');
          }
        }.bind(this)
      );
  }
}

export default AStar;
